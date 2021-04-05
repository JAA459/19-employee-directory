import React from "react";
import API from "../utils/API";
import "./style.css";

class Users extends React.Component {
    state = {
        users: [],
        search: "",
        sortDirection: "",
        col: "",
    }
    componentDidMount() {
        API.UserList().then(res => {
            const newArray = res.data.results.map(item => {
                return {
                    first: item.name.first,
                    last: item.name.last,
                    email: item.email,
                    dob: item.dob.date,
                    image: item.picture.medium
                };
            });
            this.setState({ users: newArray });
        })
        .catch(err => console.log(err));
    }

    handleSearchChange = e => {
        this.setState({ search: e.target.value });
      };

    filteredUsers() {
        const search = this.state.search.toLowerCase();
        return this.state.users.filter(user => {
          return (
            user.first.toLowerCase().includes(search) ||
            user.last.toLowerCase().includes(search)
          );
        });
      }

    renderUsers = () => {
        return this.filteredUsers()
          .sort(this.sortUsers)
          .map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={user.image} alt="user"></img>
                </td>
                <td>{user.first}</td>
                <td>{user.last}</td>
                <td>{user.email}</td>
                <td>{new Date(user.dob).toDateString()}</td>
              </tr>
            );
          });
      };

      sortUsers = (a, b) => {
        if (a[this.state.col] < b[this.state.col]) {
          return this.state.sortDirection === "ascending" ? -1 : 1;
        } else if (a[this.state.col] > b[this.state.col]) {
          return this.state.sortDirection === "ascending" ? 1 : -1;
        }
        return 0;
      };

    sortLastName = () => {
        var userEl = this.state.users.sort((a, b) => {
            return a.last.localeCompare(b.last)
        });
        this.setState({ users: userEl });
    }
    sortFirstName = () => {
        var userEl = this.state.users.sort((a, b) => {
            return a.first.localeCompare(b.first)
        });
        this.setState({ users: userEl });
    }

    sortEmail = () => {
        var userEl = this.state.users.sort((a, b) => {
            return a.email.localeCompare(b.email)
        });
        this.setState({ users: userEl });
    }

    sortDOB = () => {
        var userEl = this.state.users.sort((a, b) => {
            return a.dob.localeCompare(b.dob)
        });
        this.setState({ users: userEl });
    }

    render() {
        return (
            <>
     <div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
    aria-describedby="search-addon" onChange={this.handleSearchChange} />
  <button type="button" class="btn btn-outline-primary">search</button>
</div>
     <table>
         <tr>
             <th>Photo</th>
             <th onClick={() => this.sortFirstName()}>First Name</th>
             <th onClick={() => this.sortLastName()}>Last Name</th>
             <th onClick={() => this.sortEmail()}>Email</th>
             <th onClick={() => this.sortDOB()}>DOB</th>
         </tr>
         <tbody>{this.renderUsers()}</tbody>
    </table>
    </>
        );
    }
}
export default Users;