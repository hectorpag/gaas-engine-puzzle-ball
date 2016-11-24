using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameEngine.Service.Configuration
{
    /// <summary>
    ///
    /// </summary>
    public partial class GameEngineConfig
    {

        /// <summary>
        /// Indicates whether we should use Redis server for caching
        /// </summary>
        public static bool RedisCachingEnabled { get; set; }

        /// <summary>
        /// Redis connection string. Used when Redis caching is enabled
        /// </summary>
        public static string RedisCachingConnectionString { get; set; }

        /// <summary>
        /// Connection string for Azure BLOB storage
        /// </summary>
        public static string AzureBlobStorageConnectionString { get; set; }
        /// <summary>
        /// Container name for Azure BLOB storage
        /// </summary>
        public static string AzureBlobStorageContainerName { get; set; }
        /// <summary>
        /// End point for Azure BLOB storage
        /// </summary>
        public static string AzureBlobStorageEndPoint { get; set; }


        public static void Set(NameValueCollection appSettings)
        {
            RedisCachingConnectionString = appSettings["RedisCachingConnectionString"];
        }
    }
}
