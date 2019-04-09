using NorthwindAngular.DTOs;
using NorthwindAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NorthwindAngular.Controllers
{
    public class ProductsController : Controller
    {
        // GET: Products
        NorthwindEntities db = new NorthwindEntities();
        ProductsModel model = new ProductsModel();
        public ActionResult Liste()
        {
            ProductsModel model = new ProductsModel();
            db.Configuration.LazyLoadingEnabled = false;
            model.pList = db.Set<Products>().ToList();
            model.cList = db.Set<Categories>().Select(x => new CategoriesDTO
            {
                CategoryID = x.CategoryID,
                CategoryName = x.CategoryName,
            }).ToList();
            model.sList = db.Set<Suppliers>().Select(x => new SuppliersDTO
            {
                SupplierID = x.SupplierID,
                CompanyName = x.CompanyName,
            }).ToList();

            return Json(model,JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Guncel(Products p)
        {
            db.Entry(p).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            return Json(p, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Sil(Products p)
        {
            db.Entry(p).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
            return Json(p, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult Ekle(Products p)
        {
            db.Entry(p).State = System.Data.Entity.EntityState.Added;
            db.SaveChanges();
            return Json(p, JsonRequestBehavior.AllowGet);

        }
    }
}