import { readexPro } from '~/elements/fonts'
import { PostAuthor } from '~/elements';
import { CarmelPostComments } from '~/components/posts'

export const CarmelPostCard = ({ 
  text,
  authorImage,
  author,
  updatedOn,
  community,
  comments
}: any) => {    

    const CardAuthor = () => {
      return <div className='flex flex-row'>
              <PostAuthor
                image={authorImage}
                updatedOn={updatedOn}
                username={author}/>
        </div>
    }
    
    return <div className={`flex flex-col justify-start relative mb-8 w-full`}>
        <div className="flex flex-col p-4 leading-normal text-left w-full  bg-primary/10 border border-primary/20 mb-4">
          <CardAuthor/>
          <p className={`${readexPro.className} mb-3 text-lg font-thin text-gray-400 2xl:w-5/6 mt-4`}>
            { text }
          </p>     
        </div>
        <CarmelPostComments comments={comments}/>
    </div>
}