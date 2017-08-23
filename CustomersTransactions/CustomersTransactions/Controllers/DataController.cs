using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CustomersTransactions.Models;

namespace CustomersTransactions.Controllers
{
    public class DataController : Controller
    {
        //
        // GET: /Data/
        #region Customer

        public JsonResult GetCustomer()
        {
            List<Customer> customer = new List<Customer>();
            using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
            {
                var sql = "Select * from Customer";
                customer = ct.Database.SqlQuery<Customer>(sql).ToList();

            }
            return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult InsertCustomer(Customer c)
        {
            string message = "";
            if (ModelState.IsValid)
            {
                using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
                {
                    var customer = ct.Customers.Where(a => a.Name.Equals(c.Name)).FirstOrDefault();
                    if (customer == null)
                    {
                        ct.Customers.Add(c);
                        ct.SaveChanges();
                        message = "Success";
                    }
                    else
                    {
                        message = "Customer Name Not Available";
                    }
                }
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult UpdateCustomer(Customer c)
        {
            var result = 0;
            string message = "";
            if (ModelState.IsValid)
            {
                using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
                {
                    var customer = ct.Customers.Where(a => a.Name.Equals(c.Name)).FirstOrDefault();
                    if (customer == null)
                    {
                        var SqlUpdate = @"update [Customer] set name=@Name,Address=@Address,Email=@Email,Age=@Age,Sex=@Sex
                                          where ID = @ID
                                          ";
                        var IDParam = new SqlParameter("@ID", c.ID);
                        var NameParam = new SqlParameter("@Name", c.Name);
                        var AddressParam = new SqlParameter("@Address", c.Address);
                        var EmailParam = new SqlParameter("@Email", c.Email);
                        var AgeParam = new SqlParameter("@Age", c.Age);
                        var SexParam = new SqlParameter("@Sex", c.Sex);
                        result = ct.Database.ExecuteSqlCommand(SqlUpdate, NameParam, AddressParam, EmailParam, AgeParam, SexParam, IDParam);

                        if (result > 0)
                        {
                            message = "Success";
                        }
                        else if (result == -1)
                        {
                            message = "Update not allowed";
                        }
                        else
                        {
                            message = "error";
                        }
                    }
                    else
                    {
                        message = "Customer Name Not Available";
                    }
                }
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult DeleteCustomer(int id)
        {
            var result = 0;
            string message = "";
            if (ModelState.IsValid)
            {
                using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
                {

                    var SqlUpdate = @"delete customer
                                          where ID = @ID 
                                          ";
                    var IDParam = new SqlParameter("@ID", id);
                    result = ct.Database.ExecuteSqlCommand(SqlUpdate, IDParam);

                    if (result > 0)
                    {
                        message = "Success";
                    }
                    else if (result == -1)
                    {
                        message = "Update not allowed";
                    }
                    else
                    {
                        message = "error";
                    }

                }
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        #endregion
        #region Transaction
        [HttpPost]
        public JsonResult GetTransactionWithParam(string name, string dtFrom, string dtTo)
        {
            List<Transactions> transaction = new List<Transactions>();
            DateTime from = Convert.ToDateTime(dtFrom);
            DateTime to = Convert.ToDateTime(dtTo);
            using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
            {
                var sql = @"select c.id as CustomerID,t.id,c.Name,t.[Transaction],t.Status, t.date
                            from [CustomerTransaction] t inner join
                            customer c on t.CustomerID = c.id
                            where  
                            Name like '%' + @name + '%' and
                            convert(varchar(10),  t.date, 103) >= @dtFrom	and  convert(varchar(10),  t.date, 103) <=  @dtTo";
                var nameParam = new SqlParameter("@name", name);
                var dtFromParam = new SqlParameter("@dtFrom", from);
                var dtToParam = new SqlParameter("@dtTo", to);
                transaction = ct.Database.SqlQuery<Transactions>(sql, nameParam, dtFromParam, dtToParam).ToList();

            }
            return new JsonResult { Data = transaction, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult GetTransaction(Transactions t)
        {
            List<Transactions> transaction = new List<Transactions>();
            using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
            {
                var sql = @" select c.id as CustomerID,t.id,c.Name,t.[Transaction],t.Status, t.Date from [CustomerTransaction] t inner join
                             customer c on t.CustomerID = c.id ";
                transaction = ct.Database.SqlQuery<Transactions>(sql).ToList();

            }
            return new JsonResult { Data = transaction, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult InsertTransaction(CustomerTransaction c)
        {
            var result = 0;
            string message = "";
            if (ModelState.IsValid)
            {
                using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
                {
                    var SqlUpdate = @" insert into [CustomerTransaction]
                                 ([CustomerID]
                                      ,[Transaction]
                                      ,[Status]
                                      ,date) values 
                                     (@CustomerID
                                      ,@Transaction
                                      ,@Status
                                      ,getdate())
                                          ";
                    var CustomerIDParam = new SqlParameter("@CustomerID", c.CustomerID);
                    var TransactionParam = new SqlParameter("@Transaction", c.Transaction);
                    var StatusParam = new SqlParameter("@Status", c.Status);
                    result = ct.Database.ExecuteSqlCommand(SqlUpdate, CustomerIDParam, TransactionParam, StatusParam);

                    if (result > 0)
                    {
                        message = "Success";
                    }
                    else if (result == -1)
                    {
                        message = "Update not allowed";
                    }
                    else
                    {
                        message = "error";
                    }

                }
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult UpdateTransaction(int iD, string transaction, string status)
        {
            var result = 0;
            string message = "";
            if (ModelState.IsValid)
            {
                using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
                {

                    var SqlUpdate = @" update CustomerTransaction set [Transaction]=@Transaction,[Status]=@Status
                                         where ID=@ID
                                          ";
                    var TransactionParam = new SqlParameter("@Transaction", transaction);
                    var StatusParam = new SqlParameter("@Status", status);
                    var IDParam = new SqlParameter("@ID", iD);
                    result = ct.Database.ExecuteSqlCommand(SqlUpdate, TransactionParam, StatusParam, IDParam);

                    if (result > 0)
                    {
                        message = "Success";
                    }
                    else if (result == -1)
                    {
                        message = "Update not allowed";
                    }
                    else
                    {
                        message = "error";
                    }

                }
            }
            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult DeleteTransaction(int id)
        {
            var result = 0;
            string message = "";

            using (CustomerTransactionEntities ct = new CustomerTransactionEntities())
            {

                var SqlUpdate = @"delete CustomerTransaction
                                          where ID = @ID 
                                          ";
                var IDParam = new SqlParameter("@ID", id);
                result = ct.Database.ExecuteSqlCommand(SqlUpdate, IDParam);

                if (result > 0)
                {
                    message = "Success";
                }
                else if (result == -1)
                {
                    message = "Update not allowed";
                }
                else
                {
                    message = "error";
                }

            }

            return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        #endregion


    }
}
