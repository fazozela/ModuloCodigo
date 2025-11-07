import { ComponentFixture, TestBed } from "@angular/core/testing";
import UserList from "./user-list";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Role, User } from "../../interfaces/user.interface";
import { of } from "rxjs";

describe('UserList Component', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  const mockUsers: User[] = [
    { id: 1, fullname: "John Doe", username: "johndoe", password: "pass123", role: Role.ADMIN },
    { id: 2, fullname: "Jane Smith", username: "janesmith", password: "pass456", role: Role.USER },
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    userService.getUsers.and.returnValue(of(mockUsers));

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', (done) => {
    fixture.detectChanges();

    component.users$.subscribe(users => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
      expect(userService.getUsers).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should initialize isDeleting signal as null', () => {
    expect(component.isDeleting()).toBeNull();
  });

  it('should navigate to create user page when onAddUser is called', () =>{
    component.onAddUser();
    expect(router.navigate).toHaveBeenCalledWith(['/users/create-user']);
  });

  it('should navigate to edit user page with correct id when onEditUser is called', () => {
    const userId = 5;

    component.onEditUser(userId);

    expect(router.navigate).toHaveBeenCalledWith(['/users', userId]);
  });

  it('should delete user successfully when confirmed', (done) => {
    const userIdToDelete = 1;
    const updatedUsers = mockUsers.filter(u => u.id !== userIdToDelete);

    spyOn(window, 'confirm').and.returnValue(true);

    userService.deleteUser.and.returnValue(of(void 0));

    userService.getUsers.and.returnValue(of(updatedUsers));

    component.onDeleteUser(userIdToDelete);

    expect(window.confirm).toHaveBeenCalledWith('¿Está seguro que desea eliminar este usuario?');

    expect(userService.deleteUser).toHaveBeenCalledWith(userIdToDelete);

    expect(component.isDeleting()).toBeNull();

    component.users$.subscribe(user => {
      expect(user.length).toBe(1);
      expect(userService.getUsers).toHaveBeenCalledTimes(2);
      done();
    })

  });

  it('should not delete user when confirmation is cancelled', () => {
    const userIdToDelete = 1;
    
    spyOn(window, 'confirm').and.returnValue(false);

    component.onDeleteUser(userIdToDelete);

    expect(userService.deleteUser).not.toHaveBeenCalled();
  });

}); 