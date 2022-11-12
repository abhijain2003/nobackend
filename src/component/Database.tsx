import React, { useEffect, useState } from 'react';
import '../Styles/Database.css';
import { useGetAllSchemaQuery, useDeleteSchemaMutation } from '../store/schema';
import { useGetAllDataOfSingleSchemaQuery } from '../store/ApiData';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

interface Schema {
    CustomSchema: Array<Object>,
    username: String,
    _id: String
}


const Database = () => {

    const user: String = window.localStorage.getItem("backbackUser") || '';

    const { data, isError, isFetching, isLoading, isSuccess } = useGetAllSchemaQuery();


    const [allAPIKEYS, setallAPIKEYS] = useState<{ _id: String }[]>([]);

    const [isCopied, setisCopied] = useState(false);
    const [selectApiKey, setselectApiKey] = useState(0);


    useEffect(() => {
        let Data: { userSchemaData: Array<Schema> } = { userSchemaData: [{ CustomSchema: [], username: '', _id: '' }] };
        if (isSuccess) {
            Data = data;


            Data.userSchemaData.filter((val) => {
                if (val.username == user) {
                    // console.log(val);
                    setallAPIKEYS(prev => [...prev, { _id: val._id }]);
                }
            });
        }
    }, [isFetching, isLoading]);


    function handleCopyMSG() {
        setisCopied(true);
        return navigator.clipboard.writeText(String('https://backpressapibuilder.herokuapp.com/yourData/' + allAPIKEYS[selectApiKey]._id))
    }

    useEffect(() => {
        setisCopied(false);
    }, [selectApiKey]);


    const [deleteSchema, responseInfo] = useDeleteSchemaMutation();
    function handleDeleteAPi() {
        confirmAlert({
            title: 'Are you Sure you want to Delete?',
            message: "These will lead to delete all data related to this schema.",
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => { await deleteSchema(allAPIKEYS[selectApiKey]) }
                },
                {
                    label: 'No',
                    onClick: () => { return }
                }
            ]
        })
    }

    return (
        <div id='database'>
            <nav className='navbar-Signup'>
                <img alt='logo' src={require('../Assets/translogo.png')} />
                <p>BACKPRESS</p>
            </nav>
            <hr />
            <main>
                <label htmlFor='apis'>Your Rest Api's for CRUD Operations</label>
                <div className='selectDiv'>
                    <select onChange={(e) => setselectApiKey(Number(e.target.value))} id='apis'>
                        {
                            allAPIKEYS.map((key, ind) => (
                                <option value={ind} key={ind}>{'https://backpressapibuilder.herokuapp.com/yourData/' + key._id}</option>
                            ))
                        }
                    </select>
                    <button onClick={() => handleCopyMSG()} >{isCopied ? 'Copied!' : 'Copy'}</button>
                    <button onClick={() => handleDeleteAPi()}>Delete</button>
                </div>
                <div className='Ruling'>
                    <div className='rules'>
                        <p>You Can view all your Schemas at <span>GET</span> https://backpressapibuilder.herokuapp.com/myusercustomschema/loginKey </p>
                        <p>your unique login key is 636c86fee15e84a75a63b914</p>
                        <p>remember you cannot update schema once create, you can only delete Schema which leads to delete all data values related to it.</p>
                    </div>
                    <div className='rules'>
                        <p>Things to keep in mind when calling your api.</p>
                        <p>1. Apart from your schema when you send POST or PUT request you need to enter two more parameters</p>
                        <p>which is the "ownerid" and "ownername" of data, while owner id reflect data's parent schema and owner name reflects the owner unique id.</p>
                        <p>{"-->"}  your onwer id for current API is unique id after yourData/ in url.</p>
                        <p>{"-->"} your owner name is {window.localStorage.getItem("backbackUser")}</p>
                        <p>2. wrap your schema object in CustomSchemaData array [] with keys "label" and "value"</p>
                    </div>
                </div>
                <APIDATA datakeys={allAPIKEYS} selectApiKey={selectApiKey} />
            </main>
        </div>
    )
}

interface Props {
    datakeys: { _id: String }[];
    selectApiKey: number
}

const APIDATA = (props: Props) => {

    const [apiData, setapiData] = useState({ data: [{ _id: '', CustomSchemaData: [{ label: '', value: '' }], ownerid: '', ownername: '' }] });
    const { data, isError, isFetching, isLoading, isSuccess } = useGetAllDataOfSingleSchemaQuery(props.datakeys.length !== 0 ? props.datakeys[props.selectApiKey]._id : 'na');

    useEffect(() => {
        if (data !== undefined) {
            setapiData(data);
            console.log(data);

        }
    }, [isSuccess, isLoading, isFetching, props.selectApiKey]);

    const [oldClickIndex, setoldClickIndex] = useState(0);

    function handleShow(index: number) {
        let element = document.querySelectorAll<HTMLElement>(".oneTimeData")[index];
        if (index == oldClickIndex) {
            if (element.style.display == 'block' || element.style.display == '') {
                element.style.display = 'none'
            } else {
                element.style.display = 'block'
            }
        } else {
            element.style.display = 'block';
        }
        console.log(apiData);

    }

    return (
        <div className='renderData'>
            {
                apiData.data.map((val, index) => (
                    <div key={index}>
                        <p className='_id' onClick={() => { handleShow(index); setoldClickIndex(index) }} >{"> " + val._id}</p>
                        <div className='oneTimeData'>
                            {
                                val.CustomSchemaData.map((itm, ind) => (
                                    <div className='labelValDiv'>
                                        <p>{itm.label}</p>
                                        <p>{"--->"}</p>
                                        <p>{itm.value}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export default Database;