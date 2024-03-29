import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_KEY = 'ID'

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    roles: Array<string> = [];

    public setToken(token: string): void {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token)
    }

    public getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY)
    }

    public setUsername(username: string): void {
        localStorage.removeItem(USERNAME_KEY)
        localStorage.setItem(USERNAME_KEY, username)
    }

    public getUsername(): string | null {
        return localStorage.getItem(USERNAME_KEY)
    }

    public logOut(): void {
        localStorage.clear()
    }

    public setId(id: string): void {
        localStorage.setItem(ID_KEY, id)
    }

    public getId(): string | null {
        return localStorage.getItem(ID_KEY)
    }
}