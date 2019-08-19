import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InternationalPaymentComponent } from './international-payment.component';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';

import {
  internationalPaymentServiceSpy,
  resetSpies,
  routerSpy,
  toastServiceSpy,
  locationSpy
} from '../../../helpers/spies';
import { InternationalPaymentService } from 'src/app/services/payment/international-payment.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('InternationalPaymentComponent', () => {
  let component: InternationalPaymentComponent;
  let fixture: ComponentFixture<InternationalPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, NgxSpinnerModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [InternationalPaymentComponent],
      providers: [
        { provide: ToastrService, useValue: toastServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: InternationalPaymentService,
          useValue: internationalPaymentServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error if an invalid form is passed', () => {
    const cardno = component.form.controls.cardno;
    cardno.setValue('');
    expect(component.form.invalid).toBeTruthy();
  });

  it('should call submit', () => {
    const response = {
      message:
        'random-rave-link',
      txRef: 'reference-id'
    };

    internationalPaymentServiceSpy.createInternationalPayment.and.returnValue(
      of(response)
    );
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', response);
    expect(component.loading).toEqual(true);
  });

  it('should call submit and throw an error', () => {
    const responseError = {
      purpose: ['This field is required.']
    };

    const value = {
      amount: '44444',
      expiryyear: '2022'
    };
    internationalPaymentServiceSpy.createInternationalPayment.and.returnValue(
      throwError(responseError)
    );
    component.onSubmitPaymentDetails({
      value
    });
    expect(component.loading).toEqual(false);
  });

  it('should call submit and successfully create payment', () => {
    const response = {
      message: 'https://random.com',
      txRef: 'receiptno'
    };

    const value = {
      cardno: '5399838383838381',
      cvv: '470',
      expirymonth: '01',
      expiryyear: '21',
      amount: '20',
      billingzip: '07205',
      billingcity: 'billingcity',
      billingaddress: 'billingaddress',
      billingstate: 'NJ',
      billingcountry: 'UK',
      savecard: true,
      purpose: 'Saving'

    };
    internationalPaymentServiceSpy.createInternationalPayment.and.returnValue(
      of(response)
    );
    component.onSubmitPaymentDetails({
      value
    });
    expect(component.loading).toEqual(false);
  });


  it('should call backClicked Method', () => {
    const el = fixture.nativeElement.querySelector('#backButton');
    el.dispatchEvent(new Event('click'));
    component.backClicked();
    fixture.whenStable().then(() => {
      expect(component.backClicked).toHaveBeenCalled();
    });
  });
});
