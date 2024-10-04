import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BillerService } from '../../services/biller.services';
import { Biller } from '../../interfaces/biller.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'biller-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private billerService: BillerService,
    private router: Router
  ) { }

  @Input() biller: Biller | undefined;
  createUserForm!: FormGroup; 
  newProduct!: FormGroup;

  ngOnInit(): void {
    console.log(this.biller);
    
    this.createUserForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      addres: new FormControl('', [Validators.required]),
      products: this.fb.array([], Validators.required)
    });

    this.newProduct = this.fb.group({
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      description: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')] ),
      unitPrice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      tax: new FormControl(0, [Validators.required]),
      taxValue: new FormControl({value : 0, disabled: true},  [Validators.required]),
      total: new FormControl({value : 0, disabled: true}, [Validators.required]),
    });
    this.newProduct.controls['tax'].valueChanges.subscribe(()=>{this.caluculateTax()});
    this.newProduct.controls['unitPrice'].valueChanges.subscribe(()=>{this.caluculateTax()});

    this.newProduct.controls['unitPrice'].valueChanges.subscribe(()=>{this.calculateTotal()});
    this.newProduct.controls['quantity'].valueChanges.subscribe(()=>{this.calculateTotal()});
    this.newProduct.controls['tax'].valueChanges.subscribe(()=>{this.calculateTotal()});

    if(this.biller){
      this.createUserForm.patchValue(this.biller);
      for(let product of this.biller.products){
        this.products.push(
          this.fb.group({
            number: product.number,
            description: product.description,
            quantity: product.quantity,
            unitPrice: product.unitPrice,
            tax: product.tax,
            taxValue: product.taxValue,
            total: product.total
          })
         );
      }
    }
  }

  caluculateTax() {
      this.newProduct.controls['taxValue'].setValue(
        (this.newProduct.get('unitPrice')?.value * this.newProduct.get('tax')?.value) / 100
      )
  }

  calculateTotal() {
    this.newProduct.controls['total'].setValue(
      (this.newProduct.get('unitPrice')?.value + this.newProduct.get('taxValue')?.value) * this.newProduct.get('quantity')?.value      
    )
  }

  calculateTaxFreeTotal() {
    return this.calculateTotalWithIva() - this.calculateTotalOfIva()
  }
  
  calculateTotalOfIva() {
    let productList = this.createUserForm.get('products')?.value
    let totalOfIva = 0
    for (let i = 0; i < productList.length; i++) {
      totalOfIva = (productList[i].taxValue * productList[i].quantity) + totalOfIva
    }
    return totalOfIva
  }


  calculateTotalWithIva() {
    let productList = this.createUserForm.get('products')?.value
    let total = 0
    for (let i = 0; i < productList.length; i++) {
      total = productList[i].total + total
      
    }
    return total
  }

  get products(){
    return this.createUserForm.get('products') as FormArray;
  }
  
  deleteProduct(index: number) {
    this.products.removeAt(index);
  }


  public addProduct() {
    if(this.newProduct.invalid) return;
    this.products.push(
      this.fb.group({
        number: this.newProduct.get('number')?.value,
        description: this.newProduct.get('description')?.value,
        quantity: this.newProduct.get('quantity')?.value,
        unitPrice: this.newProduct.get('unitPrice')?.value,
        tax: this.newProduct.get('tax')?.value,
        taxValue: this.newProduct.get('taxValue')?.value,
        total: this.newProduct.get('total')?.value
      })
     );

    this.newProduct.reset();
  }

  createBiller() {
    if(this.createUserForm.invalid) return;
    if(this.biller){
      this.billerService.setBiller(this.createUserForm.value, this.biller.id);
      this.router.navigate(['/create-view/list-view']);
    }else{
      this.billerService.addBiller(this.createUserForm.value)
    }
    this.createUserForm.reset();
    this.products.clear();
  }
}
