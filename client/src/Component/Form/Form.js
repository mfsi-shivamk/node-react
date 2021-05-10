import React from 'react'

function Form(props) {
    console.log(props)
    return (
        <div>
            <form action="/">
                {Object.keys(props).map((r, i) => {
                            return <React.Fragment key={i}>
                                <label htmlFor={props[r]['for']}>{props[r]['label']}</label>
                                <input type={props[r]['type']} id={props[r]['id']} name={props[r]['name']} placeholder={props[r]['placeholder']} />
                            </React.Fragment>
                })}
                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

export default Form
