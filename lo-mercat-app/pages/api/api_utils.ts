interface UpdateOrCreatePrisma {
    schema: any
    where: any
    update: any
    create: any
}

interface UpdateOrCreateReturn<T> {
    created: boolean
    obj: T
}

async function updateOrCreate<T>({ schema, where, update, create }: UpdateOrCreatePrisma): Promise<UpdateOrCreateReturn<T>> {
    let created = true;
    let pre_defined = await (schema as any).findFirst(
        {
            where
        }
    );

    let id = '0';
    if (pre_defined != null) {
        id = pre_defined.id;
        created = false;
    }

    let obj = await (schema as any).upsert({
        where: {
            id: id
        },
        update,
        create
    });
    return { created, obj };
}

export { updateOrCreate };