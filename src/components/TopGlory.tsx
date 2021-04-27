import React from 'react'
import {
  Box,
  Badge,
  Chip,
  Popover,
  List,
  ListItem,
  Divider,
} from '@material-ui/core'
import { PeopleAlt } from '@material-ui/icons'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { useRecoilValue } from 'recoil'
import Student from '@/components/Student'
import { bestBrotherState } from '@/store/global'

const TopGlory = () => {
  const bestBrother = useRecoilValue(bestBrotherState)

  return (
    <Box p={3}>
      <PopupState variant="popover">
        {popupState => (
          <div>
            <Badge badgeContent={bestBrother.length} color="secondary">
              <Chip
                {...bindTrigger(popupState)}
                color="primary"
                icon={<PeopleAlt />}
                label="最佳雪人兄弟"
              />
            </Badge>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box p={2}>
                <List>
                  <Divider component="li" />
                  {bestBrother.map(item => (
                    <>
                      <ListItem>
                        {item.name.map(id => (
                          <Student
                            color="secondary"
                            key={id}
                            className="mr-1"
                            id={id}
                          />
                        ))}
                        （累计合作 {item.times} 次）
                      </ListItem>
                      <Divider component="li" />
                    </>
                  ))}
                </List>
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
    </Box>
  )
}

export default TopGlory
