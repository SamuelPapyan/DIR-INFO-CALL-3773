export const createOrganization = async(formData)=>{
    const response = await fetch('http://localhost:2021/organizations',{
        method:"POST",
        body:formData
    });
    return response.json();
}

export const getAllOrganizations = async()=>{
    const response = await fetch('http://localhost:2021/organizations',{
        method:"GET",
    });
    return response.json();
}

export const getAllOrgsByCategory = async(category)=>{
    const response = await fetch('http://localhost:2021/organizations?category='+category,{
        method:"GET",
    });
    return response.json();
}

export const getAllOrgsWithSubcategory = async(category, subcategory)=>{
    console.log('http://localhost:2021/organizations?category='+category+'&subcategory='+subcategory)
    const response = await fetch('http://localhost:2021/organizations?category='+category+'&subcategory='+subcategory,{
        method:"GET",
    });
    return response.json();
}

export const getOneOrganization = async(orgId)=>{
    const response = await fetch('http://localhost:2021/organizations/'+orgId,{
        method:"GET",
    });
    return response.json();
}

export const updateOrganization = async(orgId, formData)=>{
    const response = await fetch('http://localhost:2021/organizations/'+orgId,{
        method:"PUT",
        body:formData
    });
    return response.json();
}

export const deleteOrganization = async(orgId)=>{
    const response = await fetch('http://localhost:2021/organizations/'+orgId,{
        method:"DELETE",
    });
    return response.json();
}

export const searchOrganizations = async(searchQuery)=>{
    const response = await fetch('http://localhost:2021/organizations?search='+searchQuery,{
        method:"GET",
    });
    return response.json();
}