import { Component, OnInit } from '@angular/core';
import { ProductdataService } from './productdata.service';
import { Router } from '@angular/router';
import { Product } from './products';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  arr: Product[] = [];
  name: string = "watch";
  loading:boolean=true;
  constructor(private _data: ProductdataService,private _router:Router) {}

  ngOnInit() {
    this.loading=true;
    this._data.getAllProducts().subscribe(
      (data: Product[]) => {
        this.arr = data;
        this.loading=false;
      },
      function(error) {
        alert(error);
      },
      function() {}
    );
  }
  onProductDelete(item: Product) {
    this._data.deleteProduct(item.pro_id).subscribe((data: any) => {
      this.arr.splice(this.arr.indexOf(item), 1);
    });
  }
  onProductEdit(item:Product){
    this._router.navigate(['/watch/editproduct',item.pro_id]);
  }
  // onSideBarClick(value) {
  //   if (value != "") {
  //     this.arr = this.arr.filter(x => x.pro_name.indexOf(value) != -1);
  //   } else {
  //     this._data.getAllProducts().subscribe(
  //       (data: Product[]) => {
  //         this.arr = data;
  //       },
  //       function(error) {
  //         alert(error);
  //       },
  //       function() {}
  //     );
  //   }
  // }
  // addToCart(item:Product) {
  //   window.alert('Your product has been added to the cart!');
  //   this.cartService.addToCart(item.pro_id);
  // }
}
