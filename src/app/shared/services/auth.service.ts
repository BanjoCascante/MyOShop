import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from '../models/app-user';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {

    public user$: Observable<firebase.User>

    constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) { 
        this.user$ = afAuth.authState;
    }

    login() {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem('returnUrl', returnUrl);
        this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

    }

    logout() {
        this.afAuth.auth.signOut();
    }

    get appUser$(): Observable<AppUser>{
        return this.user$.switchMap(user=>{
                if(user) return this.userService.get(user.uid);
                return Observable.of(null);

            }
        )
    }

}
