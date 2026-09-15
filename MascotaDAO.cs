using Microsoft.Data.SqlClient;
using System.Data;

namespace Parcial_Yata_Belinda
{
    public class MascotaDAO
    {
        private  Conexion _conexion = new Conexion();

        public bool InsertarMascota(string nombreMascota, string nombreDueno, string tipo, int edad, string telefono, string observacion)
        {
            using (SqlConnection cn = _conexion.ObtenerConexion())
            {
                using (SqlCommand cmd = new SqlCommand("spInsertarMascotas", cn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@NombreMascota", nombreMascota);
                    cmd.Parameters.AddWithValue("@NombreDueno", nombreDueno);
                    cmd.Parameters.AddWithValue("@Tipo", tipo);
                    cmd.Parameters.AddWithValue("@Edad", edad);
                    cmd.Parameters.AddWithValue("@Telefono", telefono);
                    cmd.Parameters.AddWithValue("@Observaciones", observacion);

                    cn.Open();
                    int filasAfectadas = cmd.ExecuteNonQuery();
                    return filasAfectadas > 0;
                }
            }
        }

        public DataTable ListarMascotas()
        {
            DataTable dt = new DataTable();

            using (SqlConnection cn = _conexion.ObtenerConexion())
            {
                using (SqlCommand cmd = new SqlCommand("spListarMascotas", cn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }
                }
            }
            return dt;
        }
    }
}

