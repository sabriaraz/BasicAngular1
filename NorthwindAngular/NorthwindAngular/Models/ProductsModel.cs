using NorthwindAngular.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NorthwindAngular.Models
{
    public class ProductsModel
    {
        public Products product { get; set; }
        public List<Products> pList { get; set; }
        public List<CategoriesDTO> cList{ get; set; }
        public List<SuppliersDTO> sList { get; set; }

    }
}