import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import Inspector from 'redux-devtools-inspector';

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-i'
               changePositionKey='ctrl-q'
               defaultIsVisible={false}
               changeMonitorKey='ctrl-m'>
    <Inspector />
    <LogMonitor />
    <SliderMonitor />
  </DockMonitor>
);
