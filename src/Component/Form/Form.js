import React from 'react'

function Form(props) {
    console.log(props)
    return (
        <div>
            <form action="/">
                {Object.keys(props).map(r => {console.log(r, 122)
                            return <React.Fragment>
                                <label for={props[r]['for']}>{props[r]['label']}</label>
                                <input type={props[r]['type']} id={props[r]['id']} name={props[r]['name']} placeholder={props[r]['placeholder']} />
                            </React.Fragment>
                })}
                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

export default Form
