import * as contentful from 'contentful';
import { useState, useEffect } from 'react'



const client = contentful.createClient({
    space: 't28f0l48twnn',
    environment: 'master', // defaults to 'master' if not set
    accessToken: import.meta.env.VITE_API_KEY,
})

export const useFetchProjects = () => {
    const [loading, setLoading] = useState(true); 
  const [projects, setProjects] = useState([]); 

  const getData = async () => {
    try {
      // Fetch entries from the unified "Project" content type
      const response = await client.getEntries({ content_type: 'birthdayProject' });
      
      const allProjects = response.items.map((item) => {
        const { title, url, image, category } = item.fields; // 'category' field to differentiate between types
        const id = item.sys.id;
        const img = image?.fields?.file?.url || 'No image';
        return { title, url, id, img, category };
      });

      setProjects(allProjects); // Set the combined data in state
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
    useEffect(() => {
        getData();
    }, []);
    return { loading, projects };
}



