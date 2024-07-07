import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardFn } from "./guards/auth.guard";
import { AdminGuardFn } from "./guards/admin.guard";

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { DetailProductComponent } from "./components/detail-product/detail-product.component";
import { OrderComponent } from "./components/order/order.component";
import { OrderDetailComponent } from "./components/order-detail/order-detail.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AdminComponent } from "./components/admin/admin.component";
import { OrderAdminComponent } from "./components/admin/order.admin/order.admin.component";
import { ProductAdminComponent } from "./components/admin/product/product.admin.component";
import { CategoryAdminComponent } from "./components/admin/category/category.admin.component";

const routes: Routes = [
    { path : '', component: HomeComponent },
    { path : 'login', component: LoginComponent },
    { path : 'register', component: RegisterComponent },
    { path : 'products/:id', component: DetailProductComponent },
    { path : 'orders', component: OrderComponent, canActivate: [AuthGuardFn]},
    { path : 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardFn]},
    { path : 'orders/:id', component: OrderDetailComponent },
    //Admin
    { path : 'admin', 
        component: AdminComponent, 
        canActivate: [AdminGuardFn] 
    },
    { path : 'admin/orders', 
        component: OrderAdminComponent, 
        canActivate: [AdminGuardFn] 
    },
    { path : 'admin/products', 
        component: ProductAdminComponent, 
        canActivate: [AdminGuardFn] 
    },
    { path : 'admin/categories', 
        component: CategoryAdminComponent, 
        canActivate: [AdminGuardFn] 
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}