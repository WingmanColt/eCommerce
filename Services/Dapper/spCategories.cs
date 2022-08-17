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
using Models;

namespace HireMe.StoredProcedures.Services
{
    public class spCategories : IspCategories
    {
        private readonly IConfiguration _config;

        private string StoreName = "spCategories";
        private string ConnectionString { get; set; }

        public spCategories(IConfiguration config)
        {
            _config = config;
            ConnectionString = _config.GetConnectionString("DefaultConnection");
            //SeedCategories();
        }

        private IDbConnection Connection { get { return new SqlConnection(ConnectionString); } }

        public async Task<OperationResult> CRUD(object? parameters, ActionEnum action, bool AutoFindParams = false, string skipAttribute = null, User user = null)
        {
            var param = new DynamicParameters();

            if (AutoFindParams)
            {
                var entity = new Category();
                param = DapperPropertiesHelper.AutoParameterFind(entity, skipAttribute);

                if (action.Equals(ActionEnum.Update))
                {
                    switch (entity.CategoriesEnum)
                    {
                        case CategoriesEnum.Increment:
                            entity.ProductsCount = entity.ProductsCount + 1;
                            break;
                        case CategoriesEnum.Decrement:
                            if (entity.ProductsCount > 0)
                                entity.ProductsCount = entity.ProductsCount - 1;
                            break;
                    }
                    param.AddDynamicParams(entity.ProductsCount);
                }
                entity.Update((CategoryInput)parameters);

            }
            else
                param.AddDynamicParams(parameters);

            var model = new { StatementType = action.GetDisplayName() };
            param.AddDynamicParams(model);


            using (IDbConnection connection = Connection)
            {
                try
                {
                    connection.Open();
                    var result = await connection.ExecuteScalarAsync<int>(StoreName, param, commandType: CommandType.StoredProcedure);
                    connection.Close();

                    return OperationResult.SuccessResult("");
                }
                catch (Exception ex)
                {
                    return OperationResult.FailureResult(ex.Message);
                }
            }

        }


        public async Task<IAsyncEnumerable<T>> GetAll<T>(GetActionEnum state)
        {
            var param = new DynamicParameters();

            var model = new { StatementType = state.GetDisplayName() };

            param.AddDynamicParams(model);

            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.QueryAsync<T>(StoreName, param, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
                connection.Close();

                return result.ToAsyncEnumerable();
            }
        }

        public async Task<int> GetAllCountBy(object parameters)
        {
            var param = new DynamicParameters();
            var model = new { StatementType = "GetAllCountBy" };
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
       
        public async Task<OperationResult> SeedCategories()
        {
            var result = await GetAll<Category>(GetActionEnum.GetAll);
            if (await result.AnyAsync())
                await CRUD(null, ActionEnum.Delete);


            var param = new DynamicParameters();
            var model = new { StatementType = "Create" };

            var lines = await File.ReadAllLinesAsync(@"wwwroot/Categories.txt");
            using (IDbConnection connection = Connection)
            {
                
                for (int i = 1; i <= (lines?.Length - 1); i++)
                {
                    var vals1 = lines[i]?.Split('#');

                    var category = new CategoryInput
                    {
                        Title = vals1[0].ToString(),
                        Icon = vals1[1].ToString(),
                        ProductsCount = 2
                    };

                    param = DapperPropertiesHelper.AutoParameterFind(category, "NotMapped");
                    param.AddDynamicParams(model);


                    try
                    {
                        connection.Open();
                        // await CRUD(category, ActionEnum.Create, true, "NotMapped");
                        var res = await connection.ExecuteScalarAsync<int>(StoreName, param, commandType: CommandType.StoredProcedure);
                        connection.Close();
                    }
                    catch (Exception ex)
                    {
                        return OperationResult.FailureResult(ex.Message);
                    }
                }
               
            }

            return OperationResult.SuccessResult("");
        }
    }
}


