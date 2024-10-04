import { Injectable } from '@angular/core';
import { Biller } from '../interfaces/biller.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({providedIn: 'root'})
export class BillerService {

    billerList: Biller[] = []

    constructor() { }

    addBiller( biller: Biller) { 
        biller.id = uuidv4();
        const currentBillers = this.getBillers();
        this.billerList = [...currentBillers, biller];
        localStorage.setItem('billerList', JSON.stringify(this.billerList));
    }

    getBillers() {
        this.billerList = JSON.parse(localStorage.getItem('billerList') || '[]');
        return this.billerList;
    }

    getBiller(id: string){
        return this.getBillers().find(biller => biller.id === id);
    }

    setBiller(biller: Biller, id: string) {
        biller.id = id;
        this.billerList = this.getBillers();
        const index = this.billerList.findIndex(b => b.id === biller.id);
        this.billerList[index] = biller;
        localStorage.setItem('billerList', JSON.stringify(this.billerList));
    }
    
    onSearch(term: string) {
        return this.billerList = this.getBillers().filter(biller => 
            (biller.name && biller.name.toLowerCase().includes(term.toLowerCase())) || 
            (biller.dni && String(biller.dni).includes(term))
        );
    }
    
    
}