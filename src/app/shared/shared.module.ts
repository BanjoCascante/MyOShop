import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        NgxDatatableModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ProductCardComponent,
        ProductQuantityComponent
    ],
    exports: [
        ProductCardComponent,
        ProductQuantityComponent,
        FormsModule,
        CustomFormsModule,
        NgxDatatableModule,
        CommonModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        NgbModule.forRoot().ngModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        UserService,
        CategoryService,
        ProductService,
        ShoppingCartService,
        OrderService,
    ]
})
export class SharedModule { }
