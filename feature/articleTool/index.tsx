import { IArticle, IReactions } from 'models/articles';
import classes from './articleTool.module.scss';
import Sharing from './components/sharing';
import Vote from './components/vote';

interface Props {
  className?: string;
  vertical?: boolean;
  votes?: IReactions;
  article?: IArticle;
}

const ArticleTool = ({ className, vertical, votes, article }: Props) => {
  return (
    <div
      className={`${classes.ArticleTool} ${
        vertical ? classes.vertical : ''
      } ${className}`}
    >
      {votes && <Vote reactions={votes} vertical={vertical} />}
      {article && <Sharing {...article} vertical={vertical} />}
    </div>
  );
};

export default ArticleTool;
