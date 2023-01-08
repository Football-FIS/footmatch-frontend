import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { TokenService } from './token.service';


@Component({
  selector: 'app-team-service',
  templateUrl: './team-service.component.html',
  styleUrls: ['./team-service.component.scss']
})
export class TeamServiceComponent {
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);

        if (params['code']) {
          this.http.post<any>(environment.backend_url + '/social-login/google/',
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
              console.log(data)
              this.tokenService.setToken(data['access_token']);
            },
            error: error => {
              console.log(error);
            }
          })
        }
      }
    );
  }

  oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
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
    for (var p in params) {
      var input = document.createElement('input');
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
