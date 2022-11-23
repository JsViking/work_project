/* eslint-disable react/no-array-index-key */
/* eslint-disable no-case-declarations */
import React, { Fragment, ReactNode } from 'react';
import IFrame from './blocks/IFrame';
import Sharing from './blocks/sharing';
import Gallery from './blocks/gallery';
import ReadAlso from './blocks/readAlso';
import { EDITOR_TYPES } from './config';
import classes from './ModuleEditorSerializer.module.scss';
import RenderText from './text';
import BlockQuote from './blocks/blockQuote';
import Image from './blocks/image';
import List from './blocks/List';
import Typography from 'components/typography';
import Divider from 'components/divider';
import { IImageBase } from 'models/images';

interface Props {
  nodes: any;
  images: IImageBase;
  children?: ReactNode;
}

const ModuleSerializer = ({ nodes, images, children }: Props) => {
  const { document } = JSON.parse(nodes);
  if (!document || !document.nodes) return <span />;

  const nodeReneder = document.nodes.map((node: any, index: number) => {
    if (node.object === 'block') {
      const textAlign = node.data[EDITOR_TYPES.TEXT_ALIGMENT] || '';
      switch (node.type) {
        case EDITOR_TYPES.LEAD:
          return (
            <Fragment key={index}>
              <Typography
                rootTag="p"
                size="size__18"
                style={{ textAlign }}
                className={classes.articleLead}
              >
                <RenderText {...node} />
              </Typography>
              {children}
            </Fragment>
          );
        case EDITOR_TYPES.TEXT_NODE:
          return (
            <Typography
              rootTag="p"
              size="size__16"
              style={{ textAlign }}
              key={index}
              className={classes.textNode}
            >
              <RenderText {...node} />
            </Typography>
          );
        case EDITOR_TYPES.HEADING_TWO:
          return (
            <Typography
              rootTag="h2"
              size="size__24"
              fontWeight="bold"
              style={{ textAlign }}
              key={index}
            >
              <RenderText {...node} />
            </Typography>
          );
        case EDITOR_TYPES.HEADING_THREE:
          return (
            <Typography
              rootTag="h3"
              size="size__18"
              fontWeight="bold"
              style={{ textAlign }}
              key={index}
            >
              <RenderText {...node} />
            </Typography>
          );
        case EDITOR_TYPES.BLOCKQUOTE:
          return <BlockQuote {...node} key={index} />;
        case EDITOR_TYPES.IMAGE:
          return <Image editor_data_images={images} {...node} key={index} />;
        case EDITOR_TYPES.GALLERY:
          return (
            <Gallery
              content={node.data}
              editor_data_images={images}
              key={index}
            />
          );
        case EDITOR_TYPES.BULLETED_LIST:
          return (
            <ul className={`${classes.list} ${classes.ulList}`} key={index}>
              <List {...node} />
            </ul>
          );
        case EDITOR_TYPES.NUMBERED_LIST:
          return (
            <ol className={`${classes.list} ${classes.olList}`} key={index}>
              <List {...node} />
            </ol>
          );
        case EDITOR_TYPES.SHARING: {
          const { source, shareProvider, showComments, sharingContent } =
            node.data;

          if (shareProvider === 'IFRAME' || shareProvider === 'YOUTUBE') {
            return <IFrame key={index} {...node.data} />;
          }
          return (
            <Sharing
              key={index}
              {...{
                shareProvider,
                source,
                showComments,
                sharingContent,
              }}
            />
          );
        }
        case EDITOR_TYPES.HTML_TEXT:
          return (
            <div
              dangerouslySetInnerHTML={{ __html: node.data.text }}
              key={index}
            />
          );
        case EDITOR_TYPES.HORIZONTAL_LINE:
          return <Divider key={index} />;
        case EDITOR_TYPES.READ_ALSO:
          return <ReadAlso url={node.data.url} key={index} />;
        default:
          return null;
      }
    }
    return null;
  });

  return nodeReneder;
};

export default ModuleSerializer;
