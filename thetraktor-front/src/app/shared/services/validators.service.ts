import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {
  private nife = '';

  public isCIF() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        const cifVal = (this.validateCif(control.value));
        if (!cifVal) {
          return {
            isCIF: cifVal
          };
        }
      }
      return null;
    };
  }
  public match(controlKey: string) {
    return (control: AbstractControl): { [s: string]: boolean } => {
      // control.parent es el FormGroup
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        const checkValue = control.parent.controls[controlKey].value;
        if (control.value !== checkValue) {
          return {
            match: true
          };
        }
      }
      return null;
    };
  }
  // STARTS calcul CIF
  private validateCif(cif: string) {
    cif = cif.replace(/ |-/gi, '').toUpperCase();
    let par = 0;
    let non = 0;
    const letras = 'ABCDEFGHKLMNPQRSW';
    const letra = cif.charAt(0);
    if (letras.indexOf(letra.toUpperCase()) == -1) {
      if (this.validateNif(cif)) {
        console.log('The NIF is correct');
        return true;
      } else {
        // Swal.fire('Ooops!', 'The the CIF is not valid as a CIF nor a NIF :-O', 'error');
        return false;
      }
    }
    for (let zz = 2; zz < 8; zz += 2) {
      par = par + parseInt(cif.charAt(zz), 10);
    }
    for (let zz = 1; zz < 9; zz += 2) {
      let nn = 2 * parseInt(cif.charAt(zz), 10);
      if (nn > 9) { nn = 1 + (nn - 10); }
      non = non + nn;
    }
    const parcial = par + non;
    let control = (10 - (parcial % 10));
    if (control == 10) { control = 0; }
    const letras2 = 'NPQRSW';
    let dc;
    if (letras2.indexOf(letra.toUpperCase()) == -1) {
      dc = control;
    } else {
      const characters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      dc = characters[control];
    }
    if (dc != cif.charAt(8)) {
      // Swal.fire('Error!', 'The CIF is not valid :-O', 'error');
      return false;
    }
    console.log('The CIF is correct');
    // Swal.fire("Nice!", "The CIF is correct.", "success");
    return true;
  }
  // ENDS calcul CIF
  // STARTS calcul NIF
  private validateNif(nif) {
    if ((nif != '') && (nif.charAt(0) != 'Q')) {
      const dni = nif.replace(/A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z| |-/gi, '');
      const cadenanif = 'TRWAGMYFPDXBNJZSQVHLCKE';
      if ((nif.charAt(0) == 'X') || (nif.indexOf('Y') == 0) || (nif.indexOf('Z') == 0)) {
        switch (nif[0]) {
          case 'X':
            this.nife = 'X' + dni.toString() + '-' + cadenanif[dni % 23];
            break;
          case 'Y':
            this.nife = 'Y' + dni.toString() + '-' + cadenanif[(10000000 + dni) % 23];
            break;
          case 'Z':
            this.nife = 'Z' + dni.toString() + '-' + cadenanif[(20000000 + dni) % 23];
            break;
          default:
            this.nife = dni.toString() + '-' + '\0';
            break;
        }
      } else {
        this.nife = dni.toString() + '-' + cadenanif[dni % 23];
      }
      if (this.nife.replace('-', '') == nif.replace('-', '')) {
        return true;
      } else {
        return false;
      }
    }
  }
  private calculLletraNif(nif) {
    if (this.validateNif(nif) == true) {
      //    $('.nifEdit').val(nife);
    } else {
      /**  Swal.fire({
       *   title: 'El DNI introduït no és correcte!',
       *   text: 'hauria de ser ' + nife + '\n\nDesitja aplicar la correcció?',
       *   type: 'warning',
       *   showCancelButton: true,
       *   confirmButtonClass: 'btn-success',
       *   confirmButtonText: 'Yes, change it!',
       *   cancelButtonText: 'No, cancel plx!',
       *   //closeOnConfirm: false,
       *   //closeOnCancel: false
       * }).then(
       *   (isConfirm) => {
       *     if (isConfirm) {
       *       // $('.nifEdit').val(nife);
       *       Swal.fire('Changed!', 'The field NIF has been changed successfully.', 'success');
       *     } else {
       *       Swal.fire('Cancelled', 'Your \'Imaginary\' NIF is safe :-O', 'error');
       *     }
       *   });
       */
    }
  }
  // ENDS calcul NIF
  // STARTS CCC to IBAN
  public ccctoiban(ccc, iban) {
    const cc = ccc.val() + '';
    const ibandef = this.getCodigoControl_IBAN('ES', cc);
    iban.val('ES' + ibandef + cc);
  }
  public ccctoibanUpd(ccc, iban) {
    if ((ccc + '').length == 20) {
      this.ccctoiban(ccc, iban);
      if (this.fn_ValidateIBAN(iban.val())) {
        ccc.val(iban.val());
      }
    }
  }
  // ENDS CCC to IBAN
  // STARTS VALIDATE CCC
  private obtenerDigito(valor) {
    const valores = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6);
    let control = 0;
    for (let i = 0; i <= 9; i++) {
      control += parseInt(valor.charAt(i), 10) * valores[i];
    }
    control = 11 - (control % 11);
    if (control == 11) { control = 0; } else if (control == 10) { control = 1; }
    return control;
  }
  private numerico(valor) {
    const cad = valor.toString();
    for (let i = 0; i < cad.length; i++) {
      const caracter = cad.charAt(i);
      if (caracter < '0' || caracter > '9') {
        return false;
      }
    }
    return true;
  }
  private fn_ValidateCCC(CCC) {
    if (!(this.obtenerDigito('00' + CCC.slice(-20, -16) + CCC.slice(-16, -12)) ==
      parseInt(CCC.slice(-12, -10).charAt(0), 10)) ||
      !(this.obtenerDigito(CCC.slice(-10)) ==
        parseInt(CCC.slice(-12, -10).charAt(1), 10))) {
      // Swal.fire('Ouch!!', 'The entered CCC number is not correct', 'warning');
    } else {
      return true;
    }
  }
  public fn_VerifyCCC(CCC) {
    if (CCC.slice(-20, -16) == '' || CCC.slice(-16, -12) == '' ||
      CCC.slice(-12, -10) == '' || CCC.slice(-10) == '') {
      //  alert('Por favor, introduzca los datos de su cuenta');
    } else {
      if (CCC.slice(-20, -16).length != 4 || CCC.slice(-16, -12).length != 4 ||
        CCC.slice(-12, -10).length != 2 || CCC.slice(-10).length != 10) {
        //  alert('Por favor, introduzca correctamente los datos de su cuenta no están completos');
      } else {
        if (!this.numerico(CCC.slice(-20, -16)) || !this.numerico(CCC.slice(-16, -12)) ||
          !this.numerico(CCC.slice(-12, -10)) || !this.numerico(CCC.slice(-10))) {
          //  alert('Por favor, introduzca correctamente los datos de su cuenta no son numericos');
        } else {
          this.fn_ValidateCCC(CCC);
        }
      }
    }
  }
  // ENDS VALIDATE CCC
  // STARTS VALIDATE IBAN
  private fn_ValidateIBAN(IBAN) {
    // Se pasa a Mayusculas
    IBAN = IBAN.toUpperCase();
    // Se quita los blancos de principio y final.
    // IBAN = trim(IBAN);
    IBAN = IBAN.replace(/\s/g, ''); // Y se quita los espacios en blanco dentro de la cadena
    let letra1, letra2, num1, num2;
    let isbanaux;
    // let numeroSustitucion;
    // La longitud debe ser siempre de 24 caracteres
    if (IBAN.length != 24) {
      return false;
    }
    // Se coge las primeras dos letras y se pasan a números
    letra1 = IBAN.substring(0, 1);
    letra2 = IBAN.substring(1, 2);
    num1 = this.getnumIBAN(letra1);
    num2 = this.getnumIBAN(letra2);
    // Se sustituye las letras por números.
    isbanaux = String(num1) + String(num2) + IBAN.substring(2);
    // Se mueve los 6 primeros caracteres al final de la cadena.
    isbanaux = isbanaux.substring(6) + isbanaux.substring(0, 6);
    // Se calcula el resto, llamando a la función modulo97, definida más abajo
    const resto = this.modulo97(isbanaux);
    if (resto == '1') {
      return true;
    } else {
      //  Swal.fire('Ouch!!', 'The entered IBAN number is not correct', 'warning');
      return false;
    }
  }
  private modulo97(iban) {
    const parts = Math.ceil(iban.length / 7);
    let remainer = '';
    for (let i = 1; i <= parts; i++) {
      remainer = String(parseFloat(remainer + iban.substr((i - 1) * 7, 7)) % 97);
    }
    return remainer;
  }
  private getnumIBAN(letra) {
    const letterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letterList.search(letra) + 10;
  }
  // ENDS VALIDATE IBAN
  // STARTS Vesio num2 IBAN
  public checkIBAN(iban) {
    if (iban.length == 24) {
      const digitoControl = this.getCodigoControl_IBAN(iban.substr(0, 2).toUpperCase(), iban.substr(4));
      if (digitoControl == iban.substr(2, 2)) {
        console.log('La cuenta es correcta');
        return true;
      }
    }
    console.log('La cuenta NO es correcta');
    return false;
  }
  // Funcion que devuelve el codigo de verificacion de una cuenta bancaria
  // @param string codigoPais los dos primeros caracteres del IBAN
  // @param string cc la cuenta corriente, que son los ultimos 20 caracteres del IBAN
  // @return string devuelve el codigo de control

  private getCodigoControl_IBAN(codigoPais, cc) {
    // cada letra de pais tiene un valor
    const valoresPaises = {
      A: '10',
      B: '11',
      C: '12',
      D: '13',
      E: '14',
      F: '15',
      G: '16',
      H: '17',
      I: '18',
      J: '19',
      K: '20',
      L: '21',
      M: '22',
      N: '23',
      O: '24',
      P: '25',
      Q: '26',
      R: '27',
      S: '28',
      T: '29',
      U: '30',
      V: '31',
      W: '32',
      X: '33',
      Y: '34',
      Z: '35'
    };
    // reemplazamos cada letra por su valor numerico y ponemos los valores mas dos ceros al final de la cuenta
    const dividendo = cc + valoresPaises[codigoPais.substr(0, 1)] + valoresPaises[codigoPais.substr(1, 1)] + '00';
    // Calculamos el modulo 97 sobre el valor numerico y lo restamos al valor 98
    let digitoControl = (98 - this.modulo(dividendo, 97)).toString();
    // Si el digito de control es un solo numero, añadimos un cero al delante
    if (digitoControl.length == 1) {
      digitoControl = '0' + digitoControl;
    }
    return digitoControl;
  }
  private modulo(valor, divisor) {
    let resto = 0;
    let dividendo = '';
    for (let i = 0; i < valor.length; i += 10) {
      dividendo = resto + '' + valor.substr(i, 10);
      resto = parseFloat(dividendo) % divisor;
    }
    return resto;
  }
  // ENDS Vesio num2 IBAN

}
