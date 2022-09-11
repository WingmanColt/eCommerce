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
    public class spCart : IspCart
    {
        private readonly IConfiguration _config;

        private string StoreName = "spCart";
        private string ConnectionString { get; set; }

        public spCart(IConfiguration config)
        {
            _config = config;
            ConnectionString = _config.GetConnectionString("DefaultConnection");
        }

        private IDbConnection Connection { get { return new SqlConnection(ConnectionString); } }

        public async Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute, string userId)
        {
            var param = new DynamicParameters();


            if (AutoFindParams)
            {
                var entity = new Cart();
                entity.Update((CartInput)parameters, userId);

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

        public async Task<T> GetByUserIdAsync<T>(string id)
        {
            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.QueryFirstOrDefaultAsync<T>(StoreName, new { userId = id, StatementType = "SelectByUserId" }, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
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

    }

}
