import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      }/*,
      {
        path: 'users',
        component: UserFromComponent
      },
      {
        path: 'categories',
        children: [
          {
            path: 'new',
            component: CategoryFormComponent
          },
          {
            path: 'edit/:prefix',
            component: CategoryFormComponent
          }
        ]
      },
      {
        path: 'tasks',
        children: [
          {
            path: 'new',
            component: TaskFormComponent
          },
          {
            path: 'edit/:taskCategoryNumber',
            component: TaskFormComponent
          }
        ]
      }*/,
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
