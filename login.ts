import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController,Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }


  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {

      if (allowed) {
        setTimeout(() => {
        this.loading.dismiss();
        this.nav.setRoot(HomePage)
        });
      } else {
        if(this.registerCredentials.email === '' || this.registerCredentials.password === ''){
          this.showError("Please enter credentials");
        } else if (this.registerCredentials.password.length < 4){
          this.showError("The password must be equal and above 4 characters");
        } else {
          this.showError("Access denied");
        }
      }
    },
    error => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
