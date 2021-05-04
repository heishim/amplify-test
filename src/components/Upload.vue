<template>
<!--enctype permet de dire que c'est spécial et qu'on va utilise plusieurs données de data-->
    <form @submit.prevent="validerEnvoi" enctype="multipart/form-data">
    <div class="field">
        
        <div class="file is-boxed is-primary">
            <label class="file-label">
                <input
                type="file"
                ref="file"
                @change="selectionDeFichier"
                class="file-input"
                />

                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                        <span class="file-label">Choisir votre fichier RSS...
                        </span>
                </span>

                <span v-if="file" class="file-name">{{file.name}}</span>

            </label>

        </div>
    </div>
    

    <div class="field">
        <button class="button is-info">VALIDER</button>
    </div>
    </form>
<!--enctype permet de dire que c'est spécial et qu'on va utilise plusieurs données de data-->
</template>

<script>
export default {
    name: "Upload",
}

</script>