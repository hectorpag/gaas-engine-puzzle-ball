using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace DodgeBall.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new StyleBundle("~/bundles/css/config").Include(
               "~/Content/bootstrap-switch/bootstrap3/bootstrap-switch.min.css"
         ));

            bundles.Add(new ScriptBundle("~/bundles/js/config").Include(
               "~/Scripts/bootstrap-switch.min.js"
          ));

            bundles.Add(new ScriptBundle("~/Assets/js/game").Include(
                "~/Scripts/jquery-3.1.0.min.js",
                "~/Scripts/hammer.min.js",
                "~/Scripts/jquery.hammer.min.js",

                "~/Assets/vendor/jquery.easing.1.3.min.js",
                "~/Assets/vendor/velocity.min.js",
                "~/Assets/vendor/devtools-detect.js",

                "~/Assets/js/gameApi.js",
                "~/Assets/js/utils.js",
                "~/Assets/js/resize.js",
                
                "~/Assets/js/game.js"
        ));
            bundles.Add(new ScriptBundle("~/Assets/js/jquery").Include(
                "~/Scripts/jquery-3.1.0.min.js"
         ));
            bundles.Add(new StyleBundle("~/Assets/css/home").Include(
               "~/Assets/css/home.css"
         ));
            bundles.Add(new StyleBundle("~/Assets/css/result").Include(
                "~/Assets/vendor/font-awesome.min.css",
               "~/Assets/css/result.css"               
         ));

            bundles.Add(new StyleBundle("~/Assets/css/game").Include(
               "~/Assets/css/style.css"
         ));
           

#if !DEBUG
    BundleTable.EnableOptimizations = true;
#endif

        }
    }
}