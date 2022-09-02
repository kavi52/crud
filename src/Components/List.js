import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';

function List(props) {
    const [lists, setLists] = useState(null)
    const [loading, setLoading] = useState(true)
    const [filterData, setFilterData] = useState('')
    
    const getList = () => {
        axios({
            url: "https://smarthub-test.herokuapp.com/account/list",
            method: "GET"
        }).then((res) => {
            setLists(res.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
        })
    }

    useEffect(() => {
        getList()
    }, [])

    useEffect(() => {

        let searchQuery = props?.search
        let result = lists?.filter((el) => {
            let filterVal = el.name.toLowerCase()
            return filterVal.indexOf(searchQuery) !== -1
        })

        setFilterData(result)

        console.log("searchh..", result);

    }, [props?.search])

    const handleDelete = (id) => {
        axios({
            url: `https://smarthub-test.herokuapp.com/account/delete/${id}`,
            method: "DELETE"
        }).then((res) => {
            console.log("response is..", res);
            getList()
        }).catch((error) => {
            console.log(error);
        })

    }

    const getListData = (tableData) => {
        console.log("table data", tableData);
        return (
            tableData?.map((list) => {
                const { age, email, gender, id, isActive, name } = list
                return (
                    <tr key={id}>
                        <th scope="row">{isActive ? "active" : "inactive"}</th>
                        <td>{age}</td>
                        <td>{name}</td>
                        <td>{gender}</td>
                        <td>{email}</td>
                        <td>
                            <span className="">Edit </span>
                            <span onClick={() => handleDelete(id)}>Delete</span>
                        </td>


                    </tr>
                )

            })
        )

    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Active</th>
                        <th>Age</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? "Loading" :
                        props?.search
                            ? getListData(filterData) :
                            getListData(lists)}

                </tbody>
            </Table>
        </div>
    );
}

export default List;