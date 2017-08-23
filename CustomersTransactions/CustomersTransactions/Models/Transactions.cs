using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomersTransactions.Models
{
    public class Transactions
    {
        public int id { get; set; }
        public int CustomerID { get; set; }
        public string Name { get; set; }
        public string Transaction { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
    }
}