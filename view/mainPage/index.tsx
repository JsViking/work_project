import Divider from 'components/divider';
import LastNewsList from 'feature/lastNewsList';
import GridBlock from 'components/mainPageBlocks/gridBlock';
import ImageBlock from 'components/mainPageBlocks/imageBlock';
import NewsBlock from 'components/mainPageBlocks/newsBlock';
import QuoteBlock from 'components/mainPageBlocks/quoteBlock';
import RegionsBlock from 'components/mainPageBlocks/regionsBlock';
import WhiteBlock from 'components/mainPageBlocks/whiteBlock';
import Slider from 'components/slider';
import Taglist from 'components/taglist';
import { MainPageProps } from 'pages';
import { Fragment } from 'react';
import classes from './mainPage.module.scss';
import Link from 'next/link';

const MainPage = ({
  lastNews,
  mainArticlesGroup,
  secondArticlesGroup,
  thirdBlockArticles,
  tags,
  editorsChoice,
}: MainPageProps) => {
  return (
    <main className={classes.MainPage}>
      <Taglist
        className={classes.tagListDesktop}
        items={tags.map(({ title, slug }) => ({
          title,
          href: `/tag/${slug}/`,
        }))}
        moreButtonLink="/"
      />
      <article className={classes.topBlock}>
        <h2 style={{ display: 'none' }}>Картина дня</h2>
        <Slider />
        <WhiteBlock />
        <ImageBlock />
      </article>
      <Taglist
        className={classes.tagListMobile}
        items={tags.map(({ title, slug }) => ({
          title,
          href: `/tag/${slug}/`,
        }))}
        moreButtonLink="/"
      />
      <div className={`${classes.centerBlock} ${classes.mainBlockNewsList}`}>
        <article className={classes.mainBlockNewsListColumn}>
          <h2 style={{ display: 'none' }}>Главные новости</h2>
          {mainArticlesGroup?.[0]?.map(
            ({ title, lead, category, image_cover, id, url }, i) => (
              <Fragment key={id}>
                <Link href={url}>
                  <a>
                    <NewsBlock
                      title={title}
                      description={lead}
                      category={category?.title}
                      image={i === 0 ? image_cover?.file : undefined}
                      showButton
                    />
                  </a>
                </Link>
                {mainArticlesGroup[0].length - 1 !== i && (
                  <div className={classes.dividerHorizontal} />
                )}
              </Fragment>
            )
          )}
        </article>
        <article className={classes.mainBlockNewsListColumn}>
          <h2 style={{ display: 'none' }}>Главные новости</h2>
          {mainArticlesGroup?.[1]?.map(
            ({ title, lead, category, image_cover, id, url }, i) => (
              <Fragment key={id}>
                <Link href={url}>
                  <a>
                    <NewsBlock
                      title={title}
                      description={lead}
                      category={category?.title}
                      image={i === 1 ? image_cover?.file : undefined}
                      showButton
                    />
                  </a>
                </Link>
                {mainArticlesGroup[1].length - 1 !== i && (
                  <div className={classes.dividerHorizontal} />
                )}
              </Fragment>
            )
          )}
        </article>
        <LastNewsList moreButton items={lastNews} />
      </div>
      <div className={`${classes.centerBlock} ${classes.twoColumns}`}>
        <div className={classes.mainBlockNewsListColumn}>
          {secondArticlesGroup?.[0]?.map(
            ({ title, category, image_cover, id, url }, i) => (
              <Fragment key={id}>
                <Link href={url}>
                  <a>
                    <NewsBlock
                      title={title}
                      category={category?.title}
                      image={i === 0 ? image_cover?.file : undefined}
                    />
                  </a>
                </Link>

                {secondArticlesGroup[0].length - 1 !== i && (
                  <div className={classes.dividerHorizontal} />
                )}
              </Fragment>
            )
          )}
        </div>
        <div className={classes.mainBlockNewsListColumn}>
          {secondArticlesGroup?.[1]?.map(
            ({ title, category, image_cover, id, url }, i) => (
              <Fragment key={id}>
                <Link href={url}>
                  <a>
                    <NewsBlock
                      title={title}
                      category={category?.title}
                      image={i === 0 ? image_cover?.file : undefined}
                    />
                  </a>
                </Link>
                {secondArticlesGroup[1].length - 1 !== i && (
                  <div className={classes.dividerHorizontal} />
                )}
              </Fragment>
            )
          )}
        </div>
      </div>
      <article className={`${classes.centerBlock}`}>
        <h2 style={{ display: 'none' }}>Интересные новости и статьи</h2>
        <GridBlock items={thirdBlockArticles} />
      </article>
      <article className={classes.centerBlock}>
        <Divider lable="Комментарии" />
        <div className={classes.twoQuoteColumns}>
          <div className={classes.quoteColumn}>
            <QuoteBlock
              title="Население, эксперты и региональная элита считают эту практику удачным примером"
              lead="сочетания онлайн- и офлайн-взаимодействия с гражданами. Прямая коммуникация с населением способствует поддержанию открытого имиджа Артюхова», – констатировали эксперты."
              author="Дмитий Артюхов"
              position="Губернатор ЯМАЛ"
              avatar="https://257824.selcdn.ru/yamalnews/fc0097ba-ef3.jpg"
            />
          </div>
          <div className={classes.quoteColumn}>
            <QuoteBlock
              type="small"
              title="Население, эксперты и региональная элита считают эту практику удачным примером"
              lead="сочетания онлайн- и офлайн-взаимодействия с гражданами. Прямая коммуникация с населением способствует поддержанию открытого имиджа Артюхова», – констатировали эксперты."
              author="Дмитий Артюхов"
              position="Губернатор ЯМАЛ"
            />
            <QuoteBlock
              type="small"
              title="Население, эксперты и региональная элита считают эту практику удачным примером"
              lead="сочетания онлайн- и офлайн-взаимодействия с гражданами. Прямая коммуникация с населением способствует поддержанию открытого имиджа Артюхова», – констатировали эксперты."
              author="Дмитий Артюхов"
              position="Губернатор ЯМАЛ"
              avatar="https://257824.selcdn.ru/yamalnews/fc0097ba-ef3.jpg"
            />
          </div>
        </div>
      </article>
      <article className={classes.centerBlock}>
        <RegionsBlock />
      </article>
      <article className={classes.centerBlock}>
        <GridBlock items={editorsChoice} label="Популярное" />
      </article>
    </main>
  );
};

export default MainPage;
