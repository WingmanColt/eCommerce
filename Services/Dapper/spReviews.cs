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

namespace HireMe.StoredProcedures.Services
{
    public class spReviews : IspReviews
    {
        private readonly IConfiguration _config;

        private string StoreName = "spReviews";
        private string ConnectionString { get; set; }

        public spReviews(IConfiguration config)
        {
            _config = config;
            ConnectionString = _config.GetConnectionString("DefaultConnection");
        }

        private IDbConnection Connection { get { return new SqlConnection(ConnectionString); } }

        public async Task<OperationResult> CRUD(object parameters, ActionEnum action, bool AutoFindParams, string skipAttribute)
        {
            var param = new DynamicParameters();


            if (AutoFindParams)
            {
                var entity = new Review();
                entity.Update((ReviewInput)parameters);

                param = DapperPropertiesHelper.AutoParameterFind(entity, skipAttribute);
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

                    return OperationResult.SuccessResult("");
                }
                catch (Exception ex)
                {
                    return OperationResult.FailureResult(ex.Message);
                }
            }

        }


        public async Task<IAsyncEnumerable<T>> GetReviewsAsync<T>(int? productId, bool forSupport)
        {
            using (IDbConnection connection = Connection)
            {
                connection.Open();
                IEnumerable<T>? result;

                if (!forSupport)
                    result = await connection.QueryAsync<T>(StoreName, new { ProductId = productId, StatementType = "Select" }, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
                else
                    result = await connection.QueryAsync<T>(StoreName, new { SendToSupport = forSupport, StatementType = "SelectForSupport" }, commandType: CommandType.StoredProcedure).ConfigureAwait(false);

                connection.Close();

                return result.ToAsyncEnumerable();
            }
        }



        public async Task<int> GetAllCountBy(int? productId, bool forSupport)
        {
            using (IDbConnection connection = Connection)
            {
                connection.Open();
                var result = await connection.ExecuteScalarAsync<int>(StoreName, new { StatementType = "GetAllCountBy", ProductId = productId, senSendToSupport = forSupport }, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
                connection.Close();

                return result;
            }
        }

    }

}
