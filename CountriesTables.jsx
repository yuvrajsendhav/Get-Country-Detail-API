import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
const CountriesTables = () => {

    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState("")
    const [filteredcountry, setFilteredcountry] = useState([])
    const getcountries = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v2/all`)
            setCountries(response.data);
            setFilteredcountry(response.data)
        }
        catch (error) {
            console.log(error);
        }
        };
        const columns = [
            {
                name: "Country Name",
                selector: (row) => row.name,
                sortable: true
            },
            {
                name: "Country Native Name",
                selector: (row) => row.nativeName,
            },
            {
                name: "Country Capital",
                selector: (row) => row.capital,
            },
            {
                name: "Country Flag",
                selector: (row) => <img width={50} alt="img"height={50} src={row.flag} />,
            }
        ]
        useEffect(() => {
            getcountries();
        }, [])

        useEffect(() => {
            const result = countries.filter(country => {
                return country.name.toLowerCase().match(search.toLowerCase());
            });
            setFilteredcountry(result);
        }, [search])
        return <DataTable title="Country List"
            columns={columns}
            data={filteredcountry}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='450px'
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            actions={<button className='btn btn-info'>Export</button>}
            subHeader
            subHeaderComponent={<input type="text" className='w-25 form-control' placeholder='Search Here' />}
            subHeaderAlign="left"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    };

    export default CountriesTables;