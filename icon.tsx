import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';

const Info = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 12 12" {...props}>
    <G
      id="Ellipse_107"
      data-name="Ellipse 107"
      fill="none"
      stroke={props.color || '#c7181f'}
      strokeWidth={1}>
      <Circle cx={6} cy={6} r={6} stroke="none" />
      <Circle cx={6} cy={6} r={5.5} fill="none" />
    </G>
    <Path
      id="Path_10751"
      data-name="Path 10751"
      d="M-1.533-.029V-3.3l.781-.093V-.029Zm0-2.456V-3.11l.117.215-.674-.322.02-.205a2.787,2.787,0,0,1,.5-.166,4.2,4.2,0,0,1,.605-.1h.215v.776ZM-2.061,0l.024-.293A2.267,2.267,0,0,1-1.76-.4q.149-.046.325-.085l-.1.361V-.791h.781v.669L-.835-.444l.63.142L-.229,0Zm.845-4.316a.517.517,0,0,1-.378-.137.5.5,0,0,1-.139-.371A.5.5,0,0,1-1.594-5.2a.517.517,0,0,1,.378-.137A.517.517,0,0,1-.837-5.2.5.5,0,0,1-.7-4.824a.5.5,0,0,1-.139.371A.517.517,0,0,1-1.216-4.316Z"
      transform="translate(7.2 8.5)"
      fill={props.color || '#c7181f'}
    />
  </Svg>
);

export default Info;
