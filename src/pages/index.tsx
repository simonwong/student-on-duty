import React, { useState, useEffect } from 'react'
import { AppBar, Tabs, Tab, Box } from '@material-ui/core'

import Layout from '@/components/Layout'
import Main from '@/components/main'
import Record from '@/components/record'

import { get } from '@/utils/request'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// }

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function HomePage() {
  const [value, setValue] = useState(0)
  const [users, setUsers] = useState([])
  const [duties, setDuties] = useState([])

  useEffect(() => {
    Promise.all([get('/users'), get('/duties')]).then(([userRes, dutyRes]) => {
      setUsers(userRes)
      setDuties(dutyRes)
    })
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Layout>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="胜率图表统计" {...a11yProps(0)} />
          <Tab label="值日生记录表格" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel className="bg-white" value={value} index={0}>
        <Main users={users} duties={duties} />
      </TabPanel>
      <TabPanel className="bg-white" value={value} index={1}>
        <Record users={users} duties={duties} />
      </TabPanel>
    </Layout>
  )
}

export default HomePage
