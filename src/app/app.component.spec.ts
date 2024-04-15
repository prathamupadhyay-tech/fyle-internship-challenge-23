import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [ApiService] // Provide the ApiService
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // Inject the ApiService
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'fyle-frontend-challenge'`, () => {
    expect(component.title).toEqual('fyle-frontend-challenge');
  });

  it('should retrieve user data', () => {
    const userData = { public_repos: 10 }; 
    spyOn(apiService, 'getUser').and.returnValue(of(userData)); 
    component.getUserData('testUser');
    expect(component.data).toEqual(userData);
    expect(component.totalItems).toEqual(userData.public_repos);
    expect(component.userDataLoader).toBeFalse();
  });



  it('should retrieve repositories', () => {
    const repoData: any[] = []; 
    spyOn(apiService, 'getRepos').and.returnValue(of(repoData)); 
    component.currentUser = 'testUser';
    component.currentPage = 1;
    component.getRepos();
    expect(component.repoData).toEqual(repoData);
    expect(component.loader).toBeFalse();
  });




});