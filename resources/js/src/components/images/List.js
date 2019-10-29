import React from 'react'
import { Image } from 'semantic-ui-react'

const ImageList = (props) => {
  return(
    <Image.Group size='small'>
      {
        props.data.map((data, i) => {
          return(
            <Image key={i} src={data.path} bordered onClick={() => props.onAction(i, data, 'edit')}/>
          )
        })
      }
    </Image.Group>
  )
}

export default ImageList;