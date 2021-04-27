import React, { useState, useEffect } from 'react'
import { Container, AppBar, Tabs, Tab, Box } from '@material-ui/core'
import { withRouter, useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import TopGlory from '@/components/TopGlory'
import { get } from '@/utils/request'
import { userState, dutyState } from '@/store/global'

const ROUTER_TAB_MAP = {
  '/record': 1,
  1: '/record',
  0: '/',
}

function Layout({ children, router }) {
  const [tab, setTab] = useState(ROUTER_TAB_MAP[router.pathname] || 0)
  const route = useRouter()

  const handleChange = (_, value) => {
    route.push(ROUTER_TAB_MAP[value], undefined, { shallow: true })
    setTimeout(() => {
      setTab(value)
    }, 100)
  }

  const [, setUsers] = useRecoilState(userState)
  const [, setDuties] = useRecoilState(dutyState)

  useEffect(() => {
    Promise.all([get('/users'), get('/duties')]).then(([userRes, dutyRes]) => {
      setUsers(userRes)
      setDuties(dutyRes)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="胜率图表统计" />
          <Tab label="值日生记录表格" />
        </Tabs>
      </AppBar>
      <div className="bg-white" role="tabpanel">
        <TopGlory />
        <Box p={3}>{children}</Box>
      </div>
    </Container>
  )
}

export default withRouter(Layout)
