using System.Data;
using Microsoft.Data.SqlClient; // O System.Data.SqlClient según tu proyecto

namespace Parcial_Yata_Belinda
{
    public class Conexion
    {
        private readonly string _cadenaConexion = "Server=JGrimaldo;Database=bd_prueba;Trusted_Connection=True;TrustServerCertificate=True;";

        public SqlConnection ObtenerConexion()
        {
            return new SqlConnection(_cadenaConexion);
        }
    }
}