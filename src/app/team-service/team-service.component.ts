import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { TokenService } from './token.service';
import { PrincipalComponent } from '../principal.component';


@Component({
  selector: 'app-team-service',
  templateUrl: './team-service.component.html',
  styleUrls: ['./team-service.component.scss']
})
export class TeamServiceComponent extends PrincipalComponent implements OnInit{
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private tokenService: TokenService, private router: Router) { 
    super()
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        //console.log(params);

        if (params['code']) {
          this.http.post<any>(environment.team_serv_url + '/social-login/google/',
            {
              code: params['code'],
              client_id: environment.client_id,
              redirect_uri: environment.front_url + '/login',
              response_type: 'code',
              audience: '',
              grant_type: '',

            }
          ).subscribe({
            next: data => {
              console.log(data['user'])
              this.tokenService.setUsername(data['user']['username'])
              //this.tokenService.setToken(data['user']['username'])
              this.tokenService.setToken(data['access_token']);
              this.tokenService.setId(data['user']['pk'])
              //console.log(data['user']['pk'])
              this.router.navigateByUrl("/profile")
            },
            error: error => {
              console.log(error);
              this.returnPrincipalError(error)
            }
          })
        }
      }
    );
  }

  oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    let form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    let params: { [key: string]: string } = {
                  'client_id': environment.client_id,
                  'redirect_uri': environment.front_url + '/login',
                  'response_type': 'code',
                  'scope':'openid profile email'
    };
  
    // Add form parameters as hidden input values.
    for (let p in params) {
      let input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
  
}
