import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'steam/callback',
        loadComponent: () => 
            import('./pages/callback/callback').then(m => m.Callback)
    },
    {
        path: 'dashboard',
        loadComponent: () => 
            import('./pages/callback/callback').then(m=>m.Callback)
    },
    {
        path: 'recommended',
        loadComponent: () =>
            import('./pages/recommended/recommended').then(m => m.Recommended)
    },
    {
        path: 'game',
        children: [
            {
                path: ':id',
                loadComponent: () =>
                    import('./pages/game-details/game-details').then(m => m.GameDetails)
            }
        ]
    },
    {
        path: 'profile',
        loadComponent: () =>
            import('./pages/profile/profile').then(m => m.Profile)
    },
    {
        path: '**',
        loadComponent: () => 
            import('./pages/not-found/not-found').then(m => m.NotFound)
    }
];
