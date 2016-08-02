#region

using System;
using System.Collections.Generic;
using System.ComponentModel;

#endregion

namespace Extensions
{
    public static class ObjectExtensions
    {
        public static T GetValue<T>(this object value)
        {
            if (value != null && value != DBNull.Value)
            {
                if (typeof(T) == typeof(DateTime) || typeof(T) == typeof(DateTime?))
                {
                    return (T) value;
                }

                var converter = TypeDescriptor.GetConverter(typeof(T));

                if (converter.CanConvertFrom(typeof(string)))
                {
                    return (T) converter.ConvertFromString(value.ToString());
                }
            }

            return default(T);
        }

        /// <summary>
        /// Attempts to convert an object to nullbale integer
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>NULL if not an integer</returns>
        public static int? GetNullableInteger(this object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return null;
            }

            int integer;
            if (!int.TryParse(value.ToString(), out integer))
            {
                return null;
            }

            return integer;
        }

        /// <summary>
        /// Attempts to convert an object to an integer
        /// </summary>
        /// <param name="value"></param>
        /// <returns>0 (Zero) if can not be converted</returns>
        public static int GetInteger(this object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return 0;
            }

            int integer;
            if (int.TryParse(value.ToString(), out integer))
            {
            }

            return integer;
        }

        public static Guid GetGuid(this object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return Guid.NewGuid();
            }

            return Guid.Parse(value.ToString());
        }

        /// <summary>
        /// Converts an object to a byte array
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static byte[] GetByte(this object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return null;
            }

            return (byte[]) value;
        }

        public static DateTime? GetDate(this object value, bool nullable = false)
        {
            if (value == DBNull.Value || value == null)
            {
                if (nullable)
                    return null;

                return new DateTime();
            }

            DateTime dt;
            if (DateTime.TryParse(value.ToString(), out dt))
            {
                return dt;
            }

            if (nullable)
                return null;

            return new DateTime();
        }

        public static bool GetBoolean(this object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return false;
            }

            bool dt;
            if (bool.TryParse(value.ToString(), out dt))
            {
                return dt;
            }

            return false;
        }


        /// <summary>
        /// Gets the decimal.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static decimal GetDecimal(this object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return 0;
            }

            decimal number;
            if (decimal.TryParse(value.ToString(), out number))
            {
            }

            return number;
        }


        /// <summary>
        /// Gets the nullable decimal.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static decimal? GetNullableDecimal(this object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return null;
            }

            decimal number;
            if (!decimal.TryParse(value.ToString(), out number))
            {
                return null;
            }

            return number;
        }

        /// <summary>
        /// Gets the double.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>If the value is a valid double value, returns the double.  Returns 0 if not a valid number.</returns>
        public static double GetDouble(this object value)
        {
            if (value == DBNull.Value || value == null)
            {
                return 0D;
            }

            double number;
            if (!double.TryParse(value.ToString(), out number))
                return 0D;

            return number;
        }

        /// <summary>
        /// Gets the nullable double.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>If the value is a valid double value, returns the double.  Returns null if not a valid number.</returns>
        public static double? GetNullableDouble(this object value)
        {
            if (value == DBNull.Value || value == null)
                return null;

            double number;
            if (!double.TryParse(value.ToString(), out number))
                return null;

            return number;
        }

        public static bool HasValue<T>(this List<T> obj)
        {
            try
            {
                return obj != null && obj.Count > 0;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}