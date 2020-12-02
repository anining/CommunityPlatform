import React, {useEffect, useRef, useState} from 'react'
import { Select } from 'antd'
import c from '../styles/view.module.css'

function SearchInput ({ initNums = [], style = {}, placeholder = "请选择", view, value, setValue, fetchName }) {
	const [data, setData] = useState([])
	const timeout = useRef(null)

	useEffect(() => {
		customizeFetch()
	}, [])

	const customizeFetch = inputValue => {
		if (timeout.current) {
			clearTimeout(timeout.current)
			timeout.current = null
		}

		function fake () {
			if(initNums.length) {
				if (inputValue) {
					setData([...initNums].filter(i => i.name.indexOf(inputValue) > -1))
				} else {
					setData([...initNums])
				}
			} else {
        if(fetchName.length > 3) {
          alert("search in null")
        }
				fetchName(1, 500, inputValue).then(r=> setData([...r]))
			}
		}

		timeout.current = setTimeout(fake, 300);
	}

  const handleSearch = value => {
		customizeFetch(value)
  }

  const handleChange = value => {
		setValue(value)
  }

	return (
		<Select
			style={style}
			showSearch
			className={view ? c.select_view : c.select_edit}
			value={value}
			placeholder={placeholder}
			defaultActiveFirstOption={false}
			showArrow
			filterOption={false}
			onSearch={handleSearch}
			onChange={handleChange}
		>
			{ data.map(i => <Select.Option key={i.id}>{i.name}</Select.Option>) }
		</Select>
	)
}

export default SearchInput
