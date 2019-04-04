class NegociacaoDao {

    constructor(connection){

        this._conn = connection;
        this._store = 'negociacoes';
    }

    insert(negociacao){

        return new Promise((resolve, reject) => {

            let request = this._conn
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = () => resolve();
            request.onerror = e => reject(e.target.error.name);
        });
    }

    selectAll() {

        return new Promise((resolve, reject) => {

            let cursor = this._conn
                .transaction([this._store], 'readonly')
                .objectStore(this._store)
                .openCursor();
            let negociacoes = [];

            cursor.onsuccess = e => {

                let current = e.target.result;

                if(current){

                    let negociacao = current.value;
                    negociacoes.push(new Negociacao(negociacao._data, negociacao._quantidade, negociacao._valor));

                    current.continue();
                }else{

                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {

                console.log(e.target.error.name);
                reject('Não foi possível selecionar as negociações');
            };
        });
    }

    deleteAll(){

        return new Promise((resolve, reject) => {

            let request = this._conn
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociacoes removidas com sucesso (DAO)');
            request.onerror = e => reject(e.target.error.name);

        });
    }
}