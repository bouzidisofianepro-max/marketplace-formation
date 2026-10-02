export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      abonnements: {
        Row: {
          created_at: string
          etablissement_id: string | null
          id: string
          periode_fin: string | null
          plan: string
          statut: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          etablissement_id?: string | null
          id?: string
          periode_fin?: string | null
          plan?: string
          statut?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          etablissement_id?: string | null
          id?: string
          periode_fin?: string | null
          plan?: string
          statut?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "abonnements_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
        ]
      }
      actions: {
        Row: {
          adresse: string | null
          champs_verrouilles: string[]
          code_insee: string | null
          code_postal: string | null
          created_at: string
          donnees_source: Json | null
          duree_heures: number | null
          entrees_sorties: string | null
          etat: string | null
          formation_id: string
          frais_additionnels: number | null
          heures_centre: number | null
          heures_entreprise: number | null
          id: string
          latitude: number | null
          longitude: number | null
          maj_source_le: string | null
          modalite: string | null
          nb_avis: number | null
          note_moyenne: number | null
          notes: Json | null
          numero_action: string | null
          prix_ht: number | null
          prix_ttc: number | null
          publie: boolean
          updated_at: string
          url_inscription: string | null
        }
        Insert: {
          adresse?: string | null
          champs_verrouilles?: string[]
          code_insee?: string | null
          code_postal?: string | null
          created_at?: string
          donnees_source?: Json | null
          duree_heures?: number | null
          entrees_sorties?: string | null
          etat?: string | null
          formation_id: string
          frais_additionnels?: number | null
          heures_centre?: number | null
          heures_entreprise?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          maj_source_le?: string | null
          modalite?: string | null
          nb_avis?: number | null
          note_moyenne?: number | null
          notes?: Json | null
          numero_action?: string | null
          prix_ht?: number | null
          prix_ttc?: number | null
          publie?: boolean
          updated_at?: string
          url_inscription?: string | null
        }
        Update: {
          adresse?: string | null
          champs_verrouilles?: string[]
          code_insee?: string | null
          code_postal?: string | null
          created_at?: string
          donnees_source?: Json | null
          duree_heures?: number | null
          entrees_sorties?: string | null
          etat?: string | null
          formation_id?: string
          frais_additionnels?: number | null
          heures_centre?: number | null
          heures_entreprise?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          maj_source_le?: string | null
          modalite?: string | null
          nb_avis?: number | null
          note_moyenne?: number | null
          notes?: Json | null
          numero_action?: string | null
          prix_ht?: number | null
          prix_ttc?: number | null
          publie?: boolean
          updated_at?: string
          url_inscription?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "actions_code_insee_fkey"
            columns: ["code_insee"]
            isOneToOne: false
            referencedRelation: "ref_communes"
            referencedColumns: ["code_insee"]
          },
          {
            foreignKeyName: "actions_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
        ]
      }
      admins: {
        Row: {
          user_id: string
        }
        Insert: {
          user_id: string
        }
        Update: {
          user_id?: string
        }
        Relationships: []
      }
      demandes: {
        Row: {
          consentement: boolean
          created_at: string
          email: string | null
          etablissement_id: string
          financement: string | null
          formation_id: string | null
          id: string
          lu_le: string | null
          message: string | null
          nom: string | null
          notes: string | null
          site_id: string | null
          statut: string
          telephone: string | null
        }
        Insert: {
          consentement?: boolean
          created_at?: string
          email?: string | null
          etablissement_id: string
          financement?: string | null
          formation_id?: string | null
          id?: string
          lu_le?: string | null
          message?: string | null
          nom?: string | null
          notes?: string | null
          site_id?: string | null
          statut?: string
          telephone?: string | null
        }
        Update: {
          consentement?: boolean
          created_at?: string
          email?: string | null
          etablissement_id?: string
          financement?: string | null
          formation_id?: string | null
          id?: string
          lu_le?: string | null
          message?: string | null
          nom?: string | null
          notes?: string | null
          site_id?: string | null
          statut?: string
          telephone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demandes_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandes_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demandes_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      details_permis: {
        Row: {
          agrement_prefectoral: string | null
          boite: string | null
          categorie: string | null
          code_inclus: boolean | null
          formation_id: string
          heures_conduite: number | null
          type_offre: string | null
        }
        Insert: {
          agrement_prefectoral?: string | null
          boite?: string | null
          categorie?: string | null
          code_inclus?: boolean | null
          formation_id: string
          heures_conduite?: number | null
          type_offre?: string | null
        }
        Update: {
          agrement_prefectoral?: string | null
          boite?: string | null
          categorie?: string | null
          code_inclus?: boolean | null
          formation_id?: string
          heures_conduite?: number | null
          type_offre?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "details_permis_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: true
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
        ]
      }
      etablissement_contacts_import: {
        Row: {
          email: string | null
          etablissement_id: string
          fonction: string | null
          id: number
          nom: string | null
          prenom: string | null
          source: string
          telephones: string[] | null
          url_web: string | null
          vu_le: string
        }
        Insert: {
          email?: string | null
          etablissement_id: string
          fonction?: string | null
          id?: never
          nom?: string | null
          prenom?: string | null
          source: string
          telephones?: string[] | null
          url_web?: string | null
          vu_le?: string
        }
        Update: {
          email?: string | null
          etablissement_id?: string
          fonction?: string | null
          id?: never
          nom?: string | null
          prenom?: string | null
          source?: string
          telephones?: string[] | null
          url_web?: string | null
          vu_le?: string
        }
        Relationships: [
          {
            foreignKeyName: "etablissement_contacts_import_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
        ]
      }
      etablissement_medias: {
        Row: {
          created_at: string
          etablissement_id: string
          id: string
          modere: boolean
          ordre: number
          titre: string | null
          type: string
          url: string
        }
        Insert: {
          created_at?: string
          etablissement_id: string
          id?: string
          modere?: boolean
          ordre?: number
          titre?: string | null
          type: string
          url: string
        }
        Update: {
          created_at?: string
          etablissement_id?: string
          id?: string
          modere?: boolean
          ordre?: number
          titre?: string | null
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "etablissement_medias_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
        ]
      }
      etablissement_membres: {
        Row: {
          created_at: string
          etablissement_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          etablissement_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          etablissement_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "etablissement_membres_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
        ]
      }
      etablissements: {
        Row: {
          accessibilite: Json | null
          adresse: string | null
          champs_verrouilles: string[]
          code_insee: string | null
          code_postal: string | null
          created_at: string
          description: string | null
          email_public: string | null
          google_place_id: string | null
          horaires: Json | null
          id: string
          labels: string[]
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          nom: string
          plan: string
          publie: boolean
          qualiopi: boolean | null
          qualiopi_date_fin: string | null
          referent_handicap: string | null
          reseaux: Json
          revendique: boolean
          revendique_le: string | null
          siren: string | null
          siret: string
          site_web: string | null
          slug: string | null
          source: string
          taux_reussite: number | null
          telephone_public: string | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          accessibilite?: Json | null
          adresse?: string | null
          champs_verrouilles?: string[]
          code_insee?: string | null
          code_postal?: string | null
          created_at?: string
          description?: string | null
          email_public?: string | null
          google_place_id?: string | null
          horaires?: Json | null
          id?: string
          labels?: string[]
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          nom: string
          plan?: string
          publie?: boolean
          qualiopi?: boolean | null
          qualiopi_date_fin?: string | null
          referent_handicap?: string | null
          reseaux?: Json
          revendique?: boolean
          revendique_le?: string | null
          siren?: string | null
          siret: string
          site_web?: string | null
          slug?: string | null
          source?: string
          taux_reussite?: number | null
          telephone_public?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          accessibilite?: Json | null
          adresse?: string | null
          champs_verrouilles?: string[]
          code_insee?: string | null
          code_postal?: string | null
          created_at?: string
          description?: string | null
          email_public?: string | null
          google_place_id?: string | null
          horaires?: Json | null
          id?: string
          labels?: string[]
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          nom?: string
          plan?: string
          publie?: boolean
          qualiopi?: boolean | null
          qualiopi_date_fin?: string | null
          referent_handicap?: string | null
          reseaux?: Json
          revendique?: boolean
          revendique_le?: string | null
          siren?: string | null
          siret?: string
          site_web?: string | null
          slug?: string | null
          source?: string
          taux_reussite?: number | null
          telephone_public?: string | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "etablissements_code_insee_fkey"
            columns: ["code_insee"]
            isOneToOne: false
            referencedRelation: "ref_communes"
            referencedColumns: ["code_insee"]
          },
          {
            foreignKeyName: "etablissements_siren_fkey"
            columns: ["siren"]
            isOneToOne: false
            referencedRelation: "organismes"
            referencedColumns: ["siren"]
          },
        ]
      }
      evenements: {
        Row: {
          action_id: string | null
          created_at: string
          etablissement_id: string
          formation_id: string | null
          id: number
          page: string | null
          site_id: string | null
          type: string
        }
        Insert: {
          action_id?: string | null
          created_at?: string
          etablissement_id: string
          formation_id?: string | null
          id?: never
          page?: string | null
          site_id?: string | null
          type: string
        }
        Update: {
          action_id?: string | null
          created_at?: string
          etablissement_id?: string
          formation_id?: string | null
          id?: never
          page?: string | null
          site_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "evenements_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evenements_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evenements_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evenements_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      famille_regles: {
        Row: {
          famille_id: string
          id: number
          priorite: number
          type: string
          valeur: string
        }
        Insert: {
          famille_id: string
          id?: never
          priorite?: number
          type: string
          valeur: string
        }
        Update: {
          famille_id?: string
          id?: never
          priorite?: number
          type?: string
          valeur?: string
        }
        Relationships: [
          {
            foreignKeyName: "famille_regles_famille_id_fkey"
            columns: ["famille_id"]
            isOneToOne: false
            referencedRelation: "familles"
            referencedColumns: ["id"]
          },
        ]
      }
      familles: {
        Row: {
          actif: boolean
          description: string | null
          id: string
          nom: string
          parent_id: string | null
          site_reference: string
          slug: string
        }
        Insert: {
          actif?: boolean
          description?: string | null
          id: string
          nom: string
          parent_id?: string | null
          site_reference: string
          slug: string
        }
        Update: {
          actif?: boolean
          description?: string | null
          id?: string
          nom?: string
          parent_id?: string | null
          site_reference?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "familles_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "familles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "familles_site_reference_fkey"
            columns: ["site_reference"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      formation_familles: {
        Row: {
          famille_id: string
          formation_id: string
          origine: string
          principale: boolean
          regle_id: number | null
        }
        Insert: {
          famille_id: string
          formation_id: string
          origine?: string
          principale?: boolean
          regle_id?: number | null
        }
        Update: {
          famille_id?: string
          formation_id?: string
          origine?: string
          principale?: boolean
          regle_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "formation_familles_famille_id_fkey"
            columns: ["famille_id"]
            isOneToOne: false
            referencedRelation: "familles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formation_familles_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formation_familles_regle_id_fkey"
            columns: ["regle_id"]
            isOneToOne: false
            referencedRelation: "famille_regles"
            referencedColumns: ["id"]
          },
        ]
      }
      formation_sites: {
        Row: {
          formation_id: string
          masque_par_centre: boolean
          reference: boolean
          site_id: string
        }
        Insert: {
          formation_id: string
          masque_par_centre?: boolean
          reference?: boolean
          site_id: string
        }
        Update: {
          formation_id?: string
          masque_par_centre?: boolean
          reference?: boolean
          site_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "formation_sites_formation_id_fkey"
            columns: ["formation_id"]
            isOneToOne: false
            referencedRelation: "formations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formation_sites_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      formations: {
        Row: {
          certification_id: string | null
          champs_verrouilles: string[]
          contenu: string | null
          created_at: string
          description_perso: string | null
          donnees_source: Json | null
          etablissement_id: string
          faq: Json | null
          financements: string[]
          id: string
          intitule: string
          numero_formation: string | null
          objectif: string | null
          prerequis: string | null
          programme_pdf_url: string | null
          publie: boolean
          resultats_attendus: string | null
          source: string
          updated_at: string
        }
        Insert: {
          certification_id?: string | null
          champs_verrouilles?: string[]
          contenu?: string | null
          created_at?: string
          description_perso?: string | null
          donnees_source?: Json | null
          etablissement_id: string
          faq?: Json | null
          financements?: string[]
          id?: string
          intitule: string
          numero_formation?: string | null
          objectif?: string | null
          prerequis?: string | null
          programme_pdf_url?: string | null
          publie?: boolean
          resultats_attendus?: string | null
          source: string
          updated_at?: string
        }
        Update: {
          certification_id?: string | null
          champs_verrouilles?: string[]
          contenu?: string | null
          created_at?: string
          description_perso?: string | null
          donnees_source?: Json | null
          etablissement_id?: string
          faq?: Json | null
          financements?: string[]
          id?: string
          intitule?: string
          numero_formation?: string | null
          objectif?: string | null
          prerequis?: string | null
          programme_pdf_url?: string | null
          publie?: boolean
          resultats_attendus?: string | null
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "formations_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "ref_certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formations_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          accepte_le: string | null
          email: string
          etablissement_id: string
          expire_le: string
          id: string
          invite_par: string | null
          role: string
          token: string
        }
        Insert: {
          accepte_le?: string | null
          email: string
          etablissement_id: string
          expire_le?: string
          id?: string
          invite_par?: string | null
          role: string
          token?: string
        }
        Update: {
          accepte_le?: string | null
          email?: string
          etablissement_id?: string
          expire_le?: string
          id?: string
          invite_par?: string | null
          role?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
        ]
      }
      organismes: {
        Row: {
          created_at: string
          raison_sociale: string | null
          siren: string
        }
        Insert: {
          created_at?: string
          raison_sociale?: string | null
          siren: string
        }
        Update: {
          created_at?: string
          raison_sociale?: string | null
          siren?: string
        }
        Relationships: []
      }
      ref_certification_formacode: {
        Row: {
          certification_id: string
          code_formacode: string
          principal: boolean | null
        }
        Insert: {
          certification_id: string
          code_formacode: string
          principal?: boolean | null
        }
        Update: {
          certification_id?: string
          code_formacode?: string
          principal?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ref_certification_formacode_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "ref_certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ref_certification_formacode_code_formacode_fkey"
            columns: ["code_formacode"]
            isOneToOne: false
            referencedRelation: "ref_formacode"
            referencedColumns: ["code"]
          },
        ]
      }
      ref_certification_nsf: {
        Row: {
          certification_id: string
          code_nsf: string
        }
        Insert: {
          certification_id: string
          code_nsf: string
        }
        Update: {
          certification_id?: string
          code_nsf?: string
        }
        Relationships: [
          {
            foreignKeyName: "ref_certification_nsf_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "ref_certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ref_certification_nsf_code_nsf_fkey"
            columns: ["code_nsf"]
            isOneToOne: false
            referencedRelation: "ref_nsf"
            referencedColumns: ["code"]
          },
        ]
      }
      ref_certification_rome: {
        Row: {
          certification_id: string
          code_rome: string
        }
        Insert: {
          certification_id: string
          code_rome: string
        }
        Update: {
          certification_id?: string
          code_rome?: string
        }
        Relationships: [
          {
            foreignKeyName: "ref_certification_rome_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "ref_certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ref_certification_rome_code_rome_fkey"
            columns: ["code_rome"]
            isOneToOne: false
            referencedRelation: "ref_rome"
            referencedColumns: ["code"]
          },
        ]
      }
      ref_certifications: {
        Row: {
          actif: boolean | null
          certificateur: string | null
          code: string
          code_certifinfo: string | null
          code_niveau: string | null
          date_fin_validite: string | null
          id: string
          intitule: string
          mis_a_jour_le: string | null
          type: string
          url_france_competences: string | null
        }
        Insert: {
          actif?: boolean | null
          certificateur?: string | null
          code: string
          code_certifinfo?: string | null
          code_niveau?: string | null
          date_fin_validite?: string | null
          id: string
          intitule: string
          mis_a_jour_le?: string | null
          type: string
          url_france_competences?: string | null
        }
        Update: {
          actif?: boolean | null
          certificateur?: string | null
          code?: string
          code_certifinfo?: string | null
          code_niveau?: string | null
          date_fin_validite?: string | null
          id?: string
          intitule?: string
          mis_a_jour_le?: string | null
          type?: string
          url_france_competences?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ref_certifications_code_niveau_fkey"
            columns: ["code_niveau"]
            isOneToOne: false
            referencedRelation: "ref_niveaux"
            referencedColumns: ["code"]
          },
        ]
      }
      ref_communes: {
        Row: {
          code_departement: string | null
          code_insee: string
          code_region: string | null
          codes_postaux: string[]
          latitude: number | null
          longitude: number | null
          nom: string
          population: number | null
          slug: string | null
        }
        Insert: {
          code_departement?: string | null
          code_insee: string
          code_region?: string | null
          codes_postaux?: string[]
          latitude?: number | null
          longitude?: number | null
          nom: string
          population?: number | null
          slug?: string | null
        }
        Update: {
          code_departement?: string | null
          code_insee?: string
          code_region?: string | null
          codes_postaux?: string[]
          latitude?: number | null
          longitude?: number | null
          nom?: string
          population?: number | null
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ref_communes_code_departement_fkey"
            columns: ["code_departement"]
            isOneToOne: false
            referencedRelation: "ref_departements"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "ref_communes_code_region_fkey"
            columns: ["code_region"]
            isOneToOne: false
            referencedRelation: "ref_regions"
            referencedColumns: ["code"]
          },
        ]
      }
      ref_departements: {
        Row: {
          code: string
          code_region: string | null
          nom: string
        }
        Insert: {
          code: string
          code_region?: string | null
          nom: string
        }
        Update: {
          code?: string
          code_region?: string | null
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "ref_departements_code_region_fkey"
            columns: ["code_region"]
            isOneToOne: false
            referencedRelation: "ref_regions"
            referencedColumns: ["code"]
          },
        ]
      }
      ref_formacode: {
        Row: {
          code: string
          libelle: string | null
        }
        Insert: {
          code: string
          libelle?: string | null
        }
        Update: {
          code?: string
          libelle?: string | null
        }
        Relationships: []
      }
      ref_imports: {
        Row: {
          id: number
          importe_le: string
          nb_lignes: number | null
          referentiel: string
          source: string
          version: string | null
        }
        Insert: {
          id?: never
          importe_le?: string
          nb_lignes?: number | null
          referentiel: string
          source: string
          version?: string | null
        }
        Update: {
          id?: never
          importe_le?: string
          nb_lignes?: number | null
          referentiel?: string
          source?: string
          version?: string | null
        }
        Relationships: []
      }
      ref_niveaux: {
        Row: {
          code: string
          equivalent: string | null
          libelle: string
        }
        Insert: {
          code: string
          equivalent?: string | null
          libelle: string
        }
        Update: {
          code?: string
          equivalent?: string | null
          libelle?: string
        }
        Relationships: []
      }
      ref_nsf: {
        Row: {
          code: string
          libelle: string
        }
        Insert: {
          code: string
          libelle: string
        }
        Update: {
          code?: string
          libelle?: string
        }
        Relationships: []
      }
      ref_organismes_habilites_inrs: {
        Row: {
          cible: boolean
          code_departement: string | null
          cp: string | null
          date_liste: string | null
          dispositif: string
          email: string | null
          importe_le: string
          nom: string | null
          numero_habilitation: string
          perimetre: string | null
          siret: string | null
          site_web: string | null
          source_page: number | null
          telephone: string | null
          ville: string | null
        }
        Insert: {
          cible?: boolean
          code_departement?: string | null
          cp?: string | null
          date_liste?: string | null
          dispositif?: string
          email?: string | null
          importe_le?: string
          nom?: string | null
          numero_habilitation: string
          perimetre?: string | null
          siret?: string | null
          site_web?: string | null
          source_page?: number | null
          telephone?: string | null
          ville?: string | null
        }
        Update: {
          cible?: boolean
          code_departement?: string | null
          cp?: string | null
          date_liste?: string | null
          dispositif?: string
          email?: string | null
          importe_le?: string
          nom?: string | null
          numero_habilitation?: string
          perimetre?: string | null
          siret?: string | null
          site_web?: string | null
          source_page?: number | null
          telephone?: string | null
          ville?: string | null
        }
        Relationships: []
      }
      ref_regions: {
        Row: {
          code: string
          nom: string
        }
        Insert: {
          code: string
          nom: string
        }
        Update: {
          code?: string
          nom?: string
        }
        Relationships: []
      }
      ref_rome: {
        Row: {
          code: string
          code_domaine: string | null
          domaine: string | null
          libelle: string | null
        }
        Insert: {
          code: string
          code_domaine?: string | null
          domaine?: string | null
          libelle?: string | null
        }
        Update: {
          code?: string
          code_domaine?: string | null
          domaine?: string | null
          libelle?: string | null
        }
        Relationships: []
      }
      ref_rome_formacode: {
        Row: {
          code_formacode: string
          code_rome: string
        }
        Insert: {
          code_formacode: string
          code_rome: string
        }
        Update: {
          code_formacode?: string
          code_rome?: string
        }
        Relationships: [
          {
            foreignKeyName: "ref_rome_formacode_code_formacode_fkey"
            columns: ["code_formacode"]
            isOneToOne: false
            referencedRelation: "ref_formacode"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "ref_rome_formacode_code_rome_fkey"
            columns: ["code_rome"]
            isOneToOne: false
            referencedRelation: "ref_rome"
            referencedColumns: ["code"]
          },
        ]
      }
      revendications: {
        Row: {
          code_hash: string | null
          created_at: string
          email_cible: string | null
          etablissement_id: string
          id: string
          methode: string
          statut: string
          tentatives: number
          user_id: string
          valide_le: string | null
        }
        Insert: {
          code_hash?: string | null
          created_at?: string
          email_cible?: string | null
          etablissement_id: string
          id?: string
          methode?: string
          statut?: string
          tentatives?: number
          user_id: string
          valide_le?: string | null
        }
        Update: {
          code_hash?: string | null
          created_at?: string
          email_cible?: string | null
          etablissement_id?: string
          id?: string
          methode?: string
          statut?: string
          tentatives?: number
          user_id?: string
          valide_le?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "revendications_etablissement_id_fkey"
            columns: ["etablissement_id"]
            isOneToOne: false
            referencedRelation: "etablissements"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          action_id: string
          complet: boolean
          created_at: string
          date_debut: string | null
          date_fin: string | null
          id: string
          numero_session: string | null
          places: number | null
          source: string
        }
        Insert: {
          action_id: string
          complet?: boolean
          created_at?: string
          date_debut?: string | null
          date_fin?: string | null
          id?: string
          numero_session?: string | null
          places?: number | null
          source?: string
        }
        Update: {
          action_id?: string
          complet?: boolean
          created_at?: string
          date_debut?: string | null
          date_fin?: string | null
          id?: string
          numero_session?: string | null
          places?: number | null
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "actions"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          actif: boolean
          created_at: string
          domaine: string | null
          id: string
          nom: string
        }
        Insert: {
          actif?: boolean
          created_at?: string
          domaine?: string | null
          id: string
          nom: string
        }
        Update: {
          actif?: boolean
          created_at?: string
          domaine?: string | null
          id?: string
          nom?: string
        }
        Relationships: []
      }
      sst_siret_lookup: {
        Row: {
          interroge_le: string | null
          numero_habilitation: string
          reponse: Json | null
          statut: number | null
        }
        Insert: {
          interroge_le?: string | null
          numero_habilitation: string
          reponse?: Json | null
          statut?: number | null
        }
        Update: {
          interroge_le?: string | null
          numero_habilitation?: string
          reponse?: Json | null
          statut?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sst_siret_lookup_numero_habilitation_fkey"
            columns: ["numero_habilitation"]
            isOneToOne: true
            referencedRelation: "ref_organismes_habilites_inrs"
            referencedColumns: ["numero_habilitation"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
