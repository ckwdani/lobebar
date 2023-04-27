# lobebar
This is a system designed to enable small volunteering cultural places to distribute bar and other shifts

## TODOS
The order of the todos is not the order they should be executed in!

### Backend
- [X] Define database structure
- [X] add controllers
    - [X] add user controller
    - [X] add gamification controller
    - [X] add suply controller
    - [X] add events controller
    - [X] add shifts controller
- [ ] add email functions
    - [ ] reset password function
- [ ] rework controllers so recurring patterns are in base controllers

### Frontend
- [X] add login
- [ ] mobile friendly
    - [ ] pwa compatabilities
- [X] add navigation
    - [ ] role based rendering
- [ ] add forms
    - [ ] add event form
    - [X] add user login form
    - [ ] add user edit form (same for self and admin edit)
    - [ ] add supply form
- [ ] add overviews
    - [ ] (ADMIN) add user overviews
    - [ ] add own shifts overview
        - [ ] add upcoming shifts  overview
        - [ ] add recent shifts overview
    - [ ] add own used supply overview
    - [ ] add events overview
        - [ ] list with open shifts
        - [ ] callendar
    - [ ] (ADMIN) add used supplies overview
    - [ ] (ADMIN) add booked supplies overview
    - [ ] (ADMIN) add supplietypes overview
    - [ ] add points and balance overwiew
    - [ ] add user-scoreboard overview
- [ ] add actions
    - [ ] add sign up for shift action
    - [ ] add use suply action (maybee balance overview)
- [X] add ngrx state management
    - [X] add state for logged in user
- [ ] add services for backend
- [ ] add error handling with snackbars


