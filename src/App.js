import React, {useRef, useState} from "react";
import './styles/app.css'
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import MyInput from "./components/UI/Input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/Select/MySelect";

function App() {
    const [posts, setPosts] = useState([
        {id:1, title: 'JavScript', body: 'discription'},
        {id:2, title: 'Python', body: 'discription'},
        {id:3, title: 'JAVA', body: 'discription'}
    ])
    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    function getSortedPosts(){
        console.log('отсортированный')
        if(selectedSort){
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts
    }
    const sortedPosts = getSortedPosts()

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }
    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <MyInput
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Поиск"
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка"
                    options={[{value:'title', name: 'По названию'},
                        {value:'body', name: 'По описанию'}]}
                />
            </div>
            {posts.length
            ? <PostList remove={removePost} posts={sortedPosts} title="Список постов 1"/>
            : <h1 style={{textAlign:"center"}}>Посты не найдены</h1>
            }
        </div>
    );
}

export default App;
