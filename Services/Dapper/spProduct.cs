using Dapper;
using HireMe.StoredProcedures.Enums;
using Microsoft.Extensions.Configuration;
using System.Data;
using Services.Helpers;
using Microsoft.Data.SqlClient;
using Core.Helpers;
using Entities.Models;
using Entities.Enums;
using Services.Interfaces;
using Entities.ViewModels.Products;
using Dasync.Collections;
using System.Linq;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System;

namespace HireMe.StoredProcedures.Services
{
    public class spProduct : IspProduct
    {
        private readonly IConfiguration _config;
        private readonly IProductExtensionService _extProductService;

        private string StoreName = "spProduct";
        private string ConnectionString { get; set; }

        public spProduct(IConfiguration config, IProductExtensionService extProductService)
        {
            _config = config;
            ConnectionString = _config.GetConnectionString("DefaultConnection");
            _extProductService = extProductService;
        }

        private IDbConnection Connection { get { return new SqlConnection(ConnectionString); } }

        public async Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute, string userId)
        {
            var param = new DynamicParameters();


            if (AutoFindParams)
            {
                var entity = new Product();
                entity.Update((ProductInput)parameters, ApproveType.Waiting, userId);

                param = DapperPropertiesHelper.AutoParameterFind(entity, skipAttribute);
                param.Add("newId", dbType: DbType.Int32, size: 50, direction: ParameterDirection.Output);
            }
            else
                param.AddDynamicParams(parameters);

            var model = new { StatementType = action.GetDisplayName() };
            param.AddDynamicParams(model);


            if (action.Equals(ActionEnum.Create))
                param.Add("Id", 0);


            using (IDbConnection connection = Connection)
            {
                try
                {
                    connection.Open();
                    var result = await connection.ExecuteScalarAsync<int>(StoreName, param, commandType: CommandType.StoredProcedure);
                    connection.Close();

                    int? iD = param.Get<int?>("newId");
                    OperationResult oResult = OperationResult.SuccessResult("");
                    oResult.Id = iD;
                    return oResult;
                }
                catch (Exception ex)
                {
                    return OperationResult.FailureResult(ex.Message);
                }
            }

        }


        public async Task<IAsyncEnumerable<T>> GetAll<T>(object parameters, GetActionEnum state, bool AutoFindParams, string skipAttribute)
        {
            
            var param = new DynamicParameters();

            if (AutoFindParams)
                param = DapperPropertiesHelper.AutoParameterFind(parameters, skipAttribute);
            else
                param.AddDynamicParams(parameters);

            var model = new { StatementType = state.GetDisplayName(), Id = 0 };
            param.AddDynamicParams(model);
            
            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.QueryAsync<T>(StoreName, param, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
                connection.Close();

                return result.ToAsyncEnumerable();
            }
        }

        public async Task<IAsyncEnumerable<ProductVW>> GetAll2(object parameters, GetActionEnum state, bool AutoFindParams, string skipAttribute)
        {
            var param = new DynamicParameters();

            if (AutoFindParams)
                param = DapperPropertiesHelper.AutoParameterFind(parameters, skipAttribute);
            else
                param.AddDynamicParams(parameters);

            var model = new { StatementType = state.GetDisplayName(), Id = 0 };
            param.AddDynamicParams(model);

            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.QueryMultipleAsync(StoreName, param, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
               
                var res = result.Read<ProductVW>().ToAsyncEnumerable();

                var img = result.Read<Images>().ToAsyncEnumerable();
                var variant = result.Read<Variants>().ToAsyncEnumerable();

                var images = new List<Images>();
                var variants = new List<Variants>();

                //var concurentBag = new ConcurrentBag<ProductVW>();
                //concurentBag = res;

                //    var options = new ParallelOptions { MaxDegreeOfParallelism = -1 };
                //  await Parallel.ForEachAsync(myResultSet, options, async (product, cancelationtoken) =>
                // {
                await foreach (var product in res)
                    {
                    // Clear Lists
                    images.Clear();
                    variants.Clear();

                    // Images
                    await foreach (var itemImage in img)
                        {
                            if (itemImage.ProductId == product.Id)
                            {
                                images.Add(itemImage);
                            } 
                        }

                    product.Images = images;
                    product.Images = product.Images.ToList();

                    // Variants
                    await foreach (var itemVariant in variant)
                    {
                        if (itemVariant.ProductId == product.Id)
                        {
                            variants.Add(itemVariant);
                        }
                    }
                    product.Variants = variants;
                    product.Variants = product.Variants.ToList();

                }

               // });

                connection.Close();
                return res;
             }
        }

        public async Task<ProductVW> GetByIdAsync(int id)
        {
            if (id <= 0)
                return null;

            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.QueryFirstOrDefaultAsync<ProductVW>(StoreName, new { Id = id > 0 ? id : 0, StatementType = "Select" }, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
                connection.Close();
                        
                result.Image = _extProductService.GetImagesAsync(id);
                result.Variant = _extProductService.GetVariantsAsync(id);
                
                return result;
            }
        }
        public async Task<T> GetByTitleAsync<T>(string title)
        {
            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.QueryFirstOrDefaultAsync<T>(StoreName, new { Title = title.Replace(' ', '-'), StatementType = "SelectByTitle" }, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
                connection.Close();

                return result;
            }
        }
        public async Task<int> GetAllCountBy(object parameters)
        {
            var param = new DynamicParameters();
            var model = new { StatementType = "GetAllCountBy", Id = 0 };
            param.AddDynamicParams(model);
            param.AddDynamicParams(parameters);

            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.ExecuteScalarAsync<int>(StoreName, param, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
                connection.Close();

                return result;
            }
        }

        public async Task<bool> AddRating(object parameters)
        {
            var param = new DynamicParameters();
            var model = new { StatementType = "AddRating" };
            param.AddDynamicParams(model);
            param.AddDynamicParams(parameters);

            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.ExecuteAsync(StoreName, param, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
                connection.Close();

                return result > 0;
            }
        }
    }

}
