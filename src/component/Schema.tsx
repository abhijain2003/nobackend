import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Schema.css';
import Animation from './Animation';
import { Link, useNavigate } from 'react-router-dom';

interface itemObj {
  label: String,
  type: String
}


const Schema = () => {
  const [hasPreviewed, sethasPreviewed] = useState(false);

  const navigate = useNavigate();

  // top level
  const [label, setlabel] = useState("");
  const [dataType, setdataType] = useState("");

  function handleLabel(e: React.ChangeEvent<HTMLInputElement>) {
    setlabel(e.target.value);
  }

  function handleDataType(e: React.ChangeEvent<HTMLSelectElement>) {
    setdataType(e.target.value);
  }

  const [itemArray, setitemArray] = useState<itemObj[]>([]);

  function handleAdd() {
    if (label !== "") {
      setitemArray(prev => [...prev, { label: label, type: dataType === 'map' ? JSON.stringify(nestedObjVals) : dataType }]);
      setlabel("");
    } else {
      alert("label and datatype need to mention.");
    }
  }

  function handleDelete(key: number) {
    setitemArray((prev) => prev.filter((_, ind) => ind !== key));
  }

  function handlePreview() {
    setshowPrototype(true);
    sethasPreviewed(true);
  }

  // for nested map object
  const [showPrototype, setshowPrototype] = useState(false);

  const [nestedObjLen, setnestedObj] = useState([0]);
  const [nestedLabel, setnestedLabel] = useState("");
  const [nestedDataType, setnestedDataType] = useState("");
  const [nestedObjVals, setnestedObjVals] = useState([{ label: "", type: "" }]);
  function addNestedProp() {
    setnestedObj(prev => [...prev, nestedObjLen.length]);
    setnestedObjVals(prev => [...prev, { label: nestedLabel, type: nestedDataType }]);
  }

  function removeNesttedProp(key: number) {
    setnestedObj((prev) => prev.filter((_, index) => index !== key));
    setnestedObjVals((prev) => prev.filter((_, index) => index !== key));
  }

  const [functionStarted, setfunctionStarted] = useState(false);

  let loggedUser = window.localStorage.getItem('backbackUser');

  const url = 'https://backpressapibuilder.herokuapp.com/myusercustomschema';
  async function handleSendSchema() {
    if (!hasPreviewed) {
      alert("preview it before you made it.")
    } else if (itemArray.length <= 1) {
      alert("please define schema for your API.")
    } else {
      await axios.post(url, {
        CustomSchema: itemArray,
        username: loggedUser !== undefined ? loggedUser : 'na'
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))


      setfunctionStarted(true);
      setTimeout(() => {
        navigate('/database');
      }, 5000);
    }
  }


  return (
    <>{
      functionStarted ? <Animation /> : <div style={{ display: 'grid' }} id='schema'>
        {/* preview */}
        <div style={{ gridArea: '1/1', display: showPrototype ? 'flex' : 'none' }} className='prototypeBox'>
          <button onClick={() => setshowPrototype(false)}>X</button>
          <div>
            {
              itemArray.map((val, ind) => (
                <div key={ind} className='viewMenu' >
                  <p>{val.label}</p>
                  <p>{val.type}</p>
                  <p onClick={() => handleDelete(ind)}>{val.label !== '' && 'X'}</p>
                </div>
              ))
            }
          </div>
        </div>

        <main style={{ gridArea: '1/1' }}>
          <div className='textBox'>
            <p className='text'>Create Structure for Your Schema</p>
            <Link className='linkText' to='/database' >Go to Database</Link>
          </div>
          <div className='box'>
            <h4 onClick={() => handlePreview()}>{itemArray.length - 1 < 0 ? 0 : itemArray.length} item has been added</h4>
            <div className='inputs'>
              <select onChange={(e) => handleDataType(e)}>
                <option value=''>Data Type</option>
                <option value='string'>String</option>
                <option value='boolean'>Boolean</option>
                <option value='null'>Null</option>
                <option value='array'>Array</option>
                <option value='map'>Map</option>
                <option value='number'>Number</option>
              </select>
              <input value={label} onChange={(e) => handleLabel(e)} placeholder='Label Name' />
            </div>
            {/* subcompo */}
            {
              dataType === 'map' && <>{
                nestedObjLen.map((val, key) => (
                  <div key={key} className='nestedMap'>
                    <input onChange={(e) => setnestedLabel(e.target.value)} type='text' name='label' placeholder='label' />
                    <select onChange={(e) => setnestedDataType(e.target.value)}>
                      <option value=''>Data Type</option>
                      <option value='string'>String</option>
                      <option value='boolean'>Boolean</option>
                      <option value='null'>Null</option>
                      <option value='number'>Number</option>
                    </select>
                    <button onClick={() => { key === nestedObjLen.length - 1 ? addNestedProp() : removeNesttedProp(key) }}>{key === nestedObjLen.length - 1 ? '+' : '-'}</button>
                  </div>
                ))
              }</>
            }
            {/* subcompo */}
            <div className='btnDiv'>
              <button onClick={() => handleAdd()}>Add</button>
              <button onClick={handleSendSchema}>Submit</button>
            </div>
          </div>
        </main>
      </div>
    }</>
  )
}

export default Schema;

